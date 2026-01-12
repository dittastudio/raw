
WP API Mappings:
https://raw.london/wp-json/wp/v2/posts?page=1&per_page=10

core/list -> innerBlocks
  core/list-item -> attrs.content

core/paragraph -> attrs.content

core/heading -> attrs.content

core/image -> attrs.url

core/gallery -> innerBlocks
  core/image -> attrs.url

core/quote -> innerBlocks
  citation -> attrs.citation
  core/paragraph