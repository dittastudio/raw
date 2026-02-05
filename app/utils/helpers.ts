const formatDateEditorial = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate()

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) {
      return 'th'
    }

    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
  })

  const monthYear = formatter.format(date)
  return `${day}${getOrdinalSuffix(day)} ${monthYear}`
}

const formatDateDMY = (dateString: string): string => {
  const date = new Date(dateString)

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const parts = formatter.formatToParts(date)

  const day = parts.find(p => p.type === 'day')?.value
  const month = parts.find(p => p.type === 'month')?.value
  const year = parts.find(p => p.type === 'year')?.value

  return `${day}.${month}.${year}`
}

const wait = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms))

const fileExtension = (filename: string | undefined | null): string => {
  if (!filename) {
    return ''
  }

  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop()!.toLowerCase() : ''
}

export {
  fileExtension,
  formatDateDMY,
  formatDateEditorial,
  wait,
}
