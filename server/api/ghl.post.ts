import { HighLevel, LogLevel } from '@gohighlevel/api-client'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const schema = z.object({
    name: z.string().min(1),
    email: z.email(),
    role: z.string().min(1),
    company: z.string().min(1),
    sector: z.string().min(1),
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
      companyName: data.company,
      customFields: [
        {
          id: 'job_title',
          value: data.role,
        },
        {
          id: 'which_best_describes_your_industry',
          value: data.sector,
        },
        {
          id: 'source',
          value: 'RAW Website',
        },
      ],
    })

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
