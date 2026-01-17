export interface BlockParagraph {
  blockName: 'core/paragraph'
  rendered?: string
}

export interface BlockHeading {
  blockName: 'core/heading'
  attrs?: {
    content?: string
  }
}

export interface BlockHtml {
  blockName: 'core/html'
  rendered?: string
}

export interface BlockImage {
  blockName: 'core/image'
  attrs?: {
    url?: string
  }
}

export interface BlockQuote {
  blockName: 'core/quote'
  attrs?: {
    citation?: string
  }
  innerBlocks?: any[]
}

export interface BlockList {
  blockName: 'core/list'
  innerBlocks?: any[]
}

export interface BlockGallery {
  blockName: 'core/gallery'
  innerBlocks?: any[]
}

export interface BlockEmbed {
  blockName: 'core/embed'
  attrs?: {
    url?: string
  }
}

export interface BlockUnknown {
  blockName: string
  [key: string]: any
}
