
### WP API Mappings:
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


### Post Schema

| WP Field      | SB Field | SB Type |
| ----------- | ----------- | ----------- |
| `name`      | `name`       | text
| `slug`   | `slug`        | text
| `date`   | `created_at`        | text
| `modified`   | `modified_at`        | text
| `yoast_head_json.title`   | `seo_title`        | text
| `yoast_head_json.description`   | `seo_description`        | text
| `_links.wp:featuredmedia.0`   | `seo_image`        | asset
| `_links.wp:featuredmedia.0`   | `hero`        | asset

