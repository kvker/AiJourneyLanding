import { ref, watch } from 'vue'

type GLMResponseJSON = { "id": string, "created": number, "model": string, "choices": { "index": number, "finish_reason"?: "stop", "delta": { "role": "assistant", "content": string } }[], "usage"?: { "prompt_tokens": number, "completion_tokens": number, "total_tokens": number } }

export function useChat() {
  const askContent = ref('')

  return {
    askContent,
  }
}