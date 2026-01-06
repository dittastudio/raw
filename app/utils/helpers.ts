const isVideoPlaying = (video: HTMLVideoElement) => (video.currentTime > 0
  && !video.paused
  && !video.ended
  && video.readyState > video.HAVE_CURRENT_DATA
)

const getFileExt = (filename: string): string => {
  const parts = filename?.split('.')

  if (!Array.isArray(parts) || parts.length === 0) {
    return ''
  }

  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : ''
}

const wait = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms))

const formatDuration = (seconds: number = 0) => {
  if (Number.isNaN(seconds) || !Number.isFinite(seconds)) {
    return '00:00'
  }

  const totalSeconds = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60
  const pad = (value: number) => value.toString().padStart(2, '0')
  const template = hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(secs)}` : `${pad(minutes)}:${pad(secs)}`

  return template
}

export {
  formatDuration,
  getFileExt,
  isVideoPlaying,
  wait,
}
