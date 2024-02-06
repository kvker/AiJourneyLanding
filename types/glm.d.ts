type GLMCharacterMeta = {
  user_info: string
  bot_info: string
  bot_name: string
  user_name?: string
}

type GLMMessage = {
  content: string
  role: 'user' | 'assistant' | 'system'
}