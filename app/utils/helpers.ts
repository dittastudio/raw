const formatDate = (dateString: string): string => {
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

const wait = (ms: number = 0) => new Promise(resolve => setTimeout(resolve, ms))

export {
  formatDate,
  wait,
}
