import Mux from '@mux/mux-node'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const mux = new Mux({
    tokenId: config.MUX_ACCESS_TOKEN,
    tokenSecret: config.MUX_SECRET_KEY,
  })

  try {
    const assets = await mux.video.assets.list()

    if (!assets || !assets.data) {
      throw new Error('No assets data found')
    }

    const filtered = assets.data.filter(asset => asset.status === 'ready' && asset.playback_ids?.find(id => id.policy === 'public'))

    return filtered ?? []
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch Mux assets: ${error.message}`,
      fatal: true,
    })
  }
})
