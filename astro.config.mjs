import { defineConfig } from 'astro/config'
import vue from "@astrojs/vue"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  site: 'https://ai.ilovecats.cn/',
  trailingSlash: "always",
  integrations: [vue(), tailwind()],
  compressHTML: true,
})