import { describe, expect, it } from 'vitest'
import { text2Voice } from './fileHandler'

describe('测试文字转语音', () => {
  it('传入文字和语音类型, 应该返回一个 mp3 文件链接', async () => {
    const ret = await text2Voice('你好啊', 1010)
    console.log(ret.url)
    expect(ret.url).toMatch(/^http.*\.mp3$/)
  }, 60000)
})

