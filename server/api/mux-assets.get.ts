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

    // We don't need the whole payload, so filter and trim off what's unused.
    // Ensure however that the data is in the original structure/shape.
    const items = assets.data
      .filter(asset => asset.status === 'ready' && asset.playback_ids?.find(id => id.policy === 'public'))
      .map(asset => ({
        id: asset.id,
        playback_ids: asset.playback_ids,
        meta: asset.meta,
        tracks: asset.tracks?.filter(track => track.type === 'video'),
        created_at: asset.created_at,
      }))

    return items ?? []
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch Mux assets: ${error.message}`,
      fatal: true,
    })
  }
})
