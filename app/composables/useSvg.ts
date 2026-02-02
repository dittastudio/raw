import { parseHTML } from 'linkedom'

export async function useSvg(url: MaybeRef<string | null | undefined>) {
  const value = toValue(url)

  if (!value || !value.trim().endsWith('.svg')) {
    return ref(null)
  }

  const { data: svg } = await useAsyncData(
    `svg-${value}`,
    async () => {
      const response = await $fetch<string>(value, {
        responseType: 'text',
      })

      if (!response.trim().startsWith('<svg')) {
        console.warn(`The fetched content from ${value} is not a valid SVG.`)
        return ref(null)
      }

      return sanitizeSvg(response)
    },
  )

  return svg
}

function sanitizeSvg(svg: string): string | undefined {
  const { document } = parseHTML(`<!DOCTYPE html><html><body>${svg}</body></html>`)

  const svgElement = document.querySelector('svg')

  if (!svgElement) {
    console.warn('No SVG element found')
    return undefined
  }

  // Be gone dangerous elements!
  const dangerousTags = ['script', 'foreignObject', 'use', 'iframe', 'embed', 'object']

  dangerousTags.forEach((tag) => {
    svgElement.querySelectorAll(tag).forEach(el => el.remove())
  })

  // Also remove any event handlers and dangerous attributes etc.
  const allElements = svgElement.querySelectorAll('*')

  ;[svgElement, ...Array.from(allElements)].forEach((el) => {
    const attributesToRemove: string[] = []

    for (const attr of el.attributes) {
      if (attr.name.startsWith('on')) {
        attributesToRemove.push(attr.name)
      }

      if ((attr.name === 'href' || attr.name === 'xlink:href')) {
        if (attr.value.trim().toLowerCase().startsWith('javascript:')) {
          attributesToRemove.push(attr.name)
        }
      }
    }

    attributesToRemove.forEach(name => el.removeAttribute(name))
  })

  return svgElement.outerHTML
}
