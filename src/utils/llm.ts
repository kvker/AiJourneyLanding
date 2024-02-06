import { serverUrl } from '@/utils/config'

type GLMResponseJSON = { "id": string, "created": number, "model": string, "choices": { "index": number, "finish_reason"?: "stop", "delta": { "role": "assistant", "content": string } }[], "usage"?: { "prompt_tokens": number, "completion_tokens": number, "total_tokens": number } }

type LLMCB = (result: string) => void

export async function doCompletions(content: string, SseCB: LLMCB, doneCB?: LLMCB) {
  const response = await doFetchStream(content)
  if (response.status !== 200) {
    return response.json().then((json: Object) => Promise.reject(json))
  }
  doParseStreamChunk(response, SseCB, doneCB)
}

async function doFetchStream(content: string) {
  const raw = JSON.stringify({
    messages: [
      {
        role: "user",
        content,
      }
    ]
  })

  const response = await fetch(serverUrl + "/api/chat/sse", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: 'text/event-stream',
      "Connection": "keep-alive",
    },
    body: raw,
  })
  return response
}


/**
 * 对 GLM 返回的 Stream 且是 JSON 的字符串处理
 * @param text 待处理的字符
 * @param tempText 上次未能 parse 的尾部字符
 * @returns {jsonList, tempText} 其中的 tempText 是未能parse的字符串, 需要追加到下一次parse
 */
function parseGlmStreamChunkJsons2JsonList(text: string, tempText: string): { jsonList: GLMResponseJSON[], tempText: string } {
  // console.log(text)
  let json: GLMResponseJSON
  let jsonList: GLMResponseJSON[] = []
  let textList = text.split('\n\n')
  for (text of textList) {
    if (!text.trim()) continue
    text = (tempText + text).replace(/data:\s|\[DONE\]/g, '')
    try {
      if (text.match(/^{.*}]}$/)) {
        json = JSON.parse(text) as GLMResponseJSON
        jsonList.push(json)
        tempText = ''
      } else {
        tempText += text
      }
    } catch (error) {
      // console.log(text)
      console.error(error)
    }
  }
  return { jsonList, tempText }
}

async function doParseStreamChunk(response: Response, sseCB: LLMCB, doneCB?: LLMCB) {
  const reader = response.body!.getReader()
  const decoder = new TextDecoder('utf-8')
  let value: Uint8Array | undefined
  let done = false
  let parseRet: { jsonList: GLMResponseJSON[], tempText: string }
  let text = ''
  let content = ''
  let resultText = ''
  let tempText = '' // 临时存储一节无法parse的字符串, 追加到可以parse为止
  let readerRet: ReadableStreamReadResult<Uint8Array>
  while (true) {
    readerRet = await reader.read()
    value = readerRet.value
    done = readerRet.done
    // console.log(value)
    if (value) {
      text = decoder.decode(value)
      parseRet = parseGlmStreamChunkJsons2JsonList(text, tempText)
      tempText = parseRet.tempText
      for (const json of parseRet.jsonList) {
        content = json.choices[0].delta.content
        if (content.trim()) {
          resultText += content
          // console.log(resultText)
          sseCB && sseCB(resultText)
        }
        // 使用await 延迟10ms
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }
    if (done) {
      console.log('done!!!')
      doneCB && doneCB(resultText)
      break
    }
  }
}