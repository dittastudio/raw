import { HighLevel, LogLevel } from '@gohighlevel/api-client'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const schema = z.object({
    name: z.string().min(1),
    email: z.email(),
    videoName: z.string().optional(),
    videoPlaybackId: z.string().optional(),
    videoPath: z.string().optional(),
  })

  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: z.flattenError(parsed.error),
    })
  }

  const data = parsed.data
  const videoUrl = `https://raw.london${data.videoPath}`
  const config = useRuntimeConfig()

  const ghl = new HighLevel({
    privateIntegrationToken: config.GHL_TOKEN,
    logLevel: LogLevel.INFO,
  })

  try {
    const contactsResponse = await ghl.contacts.upsertContact({
      locationId: config.GHL_LOCATION_ID,
      name: data.name,
      email: data.email,
      source: 'RAW Website',
      customFields: [
        {
          id: 'source',
          value: 'RAW Website',
        },
        {
          id: 'last_video_watched_name',
          value: data.videoName,
        },
        {
          id: 'last_video_watched_id',
          value: data.videoPlaybackId,
        },
        {
          id: 'last_video_watched_url',
          value: videoUrl,
        },
        {
          id: 'last_video_watched_datetime',
          value: new Date().toISOString(),
        },
      ],
    })

    const contactId = contactsResponse.contact?.id

    if (contactId) {
      await ghl.contacts.createNote(
        { contactId },
        {
          title: 'Video Form Submission',
          body: `<p><strong>${data.name}</strong> (${data.email}) filled out the form on your video <strong>${data.videoName || 'N/A'}</strong></p>
<p><strong>Details:</strong><br>Playback Id: ${data.videoPlaybackId || 'N/A'}<br>URL: ${videoUrl || 'N/A'}</p>`,
        },
      )
    }

    return { success: true, contactId }
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to upsert contact: ${error.message}`,
      fatal: true,
    })
  }
})
