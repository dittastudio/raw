import { HighLevel, LogLevel } from '@gohighlevel/api-client'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const schema = z.object({
    name: z.string().min(1),
    email: z.email(),
    videoName: z.string().optional(),
    videoPlaybackId: z.string().optional(),
    videoUrl: z.string().optional(),
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
  const config = useRuntimeConfig()

  const ghl = new HighLevel({
    privateIntegrationToken: config.GHL_TOKEN,
    logLevel: LogLevel.INFO,
  })

  try {
    const response = await ghl.contacts.upsertContact({
      locationId: config.GHL_LOCATION_ID,
      name: data.name,
      email: data.email,
      source: 'RAW Website',
      customFields: [
        {
          id: 'source',
          value: 'RAW Website',
        },
      ],
    })

    const contactId = response.contact?.id

    if (contactId) {
      await ghl.contacts.createNote(
        { contactId },
        {
          body: `
<p><strong>${data.name}</strong> (${data.email}) filled out the form on your video <strong>${data.videoName || 'N/A'}</strong></p>
<p><strong>Details:</strong><br>Page: <a href="${data.videoUrl}" target="_blank" rel="noopener noreferrer">${data.videoUrl || 'N/A'}</a><br>Mux playbackId: ${data.videoPlaybackId || 'N/A'}</p>
`,
        },
      )
    }

    return response
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to upsert contact: ${error.message}`,
      fatal: true,
    })
  }
})
