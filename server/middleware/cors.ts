import { handleCors } from 'h3'

function parseOrigins(value: string | undefined) {
  if (!value) {
    return []
  }

  return value
    .split(',')
    .map(v => v.trim())
    .filter(Boolean)
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const origins = parseOrigins(config.CORS_ORIGINS)

  if (!origins.length) {
    return
  }

  handleCors(event, {
    origin: origins.includes('*') ? '*' : origins,
    methods: '*',
    allowHeaders: '*',
    maxAge: '600',
    preflight: {
      statusCode: 204,
    },
  })
})
