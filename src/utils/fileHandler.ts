import { serverUrl } from '@/utils/config'
import lc from '@/libs/lc'

export function chooseFile(cb: (files?: FileList) => void, multiple = true, accept?: string) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = accept || 'image/*'
  input.multiple = multiple
  input.style.marginTop = '100000px'
  document.body.append(input)
  input.click()
  input.remove()

  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      cb(files)
    } else {
      cb()
    }
  }
}

export function file2BlobUrl(file: File | url) {
  if (typeof file === 'string') return file
  return URL.createObjectURL(file)
}

export async function text2Voice(text: string, voiceType?: number): Promise<{ url: string }> {
  const ret = await fetch(serverUrl + '/api/tencent/text2voice', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, voiceType }),
  }).then(ret => ret.json())
  // console.log(ret.data.Audio)
  let audioBase64 = ret.data.base64
  const uploadRet = await lc.uploadBase64(audioBase64, Date.now() + '.mp3')
  return { url: uploadRet.get('url') }
}