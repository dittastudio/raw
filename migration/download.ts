import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { wait } from './utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_DIR = path.join(__dirname, 'data')

async function download() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const urls: string[] = []

  for (let i = 1; i <= 34; i++) {
    urls.push(`https://raw.london/wp-json/wp/v2/posts?page=${i}&per_page=10&_fields=id,date,modified,slug,title.rendered,yoast_head_json.title,yoast_head_json.description,yoast_head_json.og_title,yoast_head_json.og_description,yoast_head_json.og_image,categories,has_blocks,block_data`)
  }

  console.log(`Found ${urls.length} URLs to download`)

  for (const [index, url] of urls.entries()) {
    try {
      console.log(`Downloading page ${index + 1}... (${index + 1}/${urls.length})`)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      const filename = `posts-${index.toString().padStart(2, '0')}.json`
      const filepath = path.join(OUTPUT_DIR, filename)
      
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
      console.log(`✅ Saved ${filename} (${data.length} posts)`)

      await wait(1000)
    }
    catch (error) {
      console.error(`❌ Failed to download page ${url}:`, error)
    }
  }

  console.log('\n👍🏻 Download complete!')
  console.log(`Files saved to: ${OUTPUT_DIR}`)
}

download().catch(console.error)
