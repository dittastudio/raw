import { defineSchema } from '@storyblok/schema';
import type { Schema as InferSchema, Story as InferStory } from '@storyblok/schema';
import type { BlockContent, MapiStory as InferStoryMapi } from '@storyblok/schema';

import { blockBcorpBlock } from './blocks/page-blocks/block-bcorp';
import { blockContactBlock } from './blocks/page-blocks/block-contact';
import { blockDividerBlock } from './blocks/page-blocks/block-divider';
import { blockEventOverviewBlock } from './blocks/page-blocks/block-event-overview';
import { blockEventTextBlock } from './blocks/page-blocks/block-event-text';
import { blockFeaturedEventBlock } from './blocks/page-blocks/block-featured-event';
import { blockGalleryBlock } from './blocks/page-blocks/block-gallery';
import { blockHeroBlock } from './blocks/page-blocks/block-hero';
import { blockHeroBrandBlock } from './blocks/page-blocks/block-hero-brand';
import { blockHoverGridBlock } from './blocks/page-blocks/block-hover-grid';
import { blockHoverListBlock } from './blocks/page-blocks/block-hover-list';
import { blockImpactDetailsBlock } from './blocks/page-blocks/block-impact-details';
import { blockImpactStatementBlock } from './blocks/page-blocks/block-impact-statement';
import { blockLogoWallBlock } from './blocks/page-blocks/block-logo-wall';
import { blockMediaBlock } from './blocks/page-blocks/block-media';
import { blockNextEventBlock } from './blocks/page-blocks/block-next-event';
import { blockPastEventsBlock } from './blocks/page-blocks/block-past-events';
import { blockPostsBlock } from './blocks/page-blocks/block-posts';
import { blockProjectCarouselBlock } from './blocks/page-blocks/block-project-carousel';
import { blockProjectsFilteredBlock } from './blocks/page-blocks/block-projects-filtered';
import { blockProjectsSelectedBlock } from './blocks/page-blocks/block-projects-selected';
import { blockSplitTextBlock } from './blocks/page-blocks/block-split-text';
import { blockTeamBlock } from './blocks/page-blocks/block-team';
import { blockTestimonialsBlock } from './blocks/page-blocks/block-testimonials';
import { blockTextBlock } from './blocks/page-blocks/block-text';
import { blockTickerBlock } from './blocks/page-blocks/block-ticker';
import { blockTruthsBlock } from './blocks/page-blocks/block-truths';
import { blockWorkTextBlock } from './blocks/page-blocks/block-work-text';
import { copyBlock } from './blocks/elements/copy';
import { eventBlock } from './blocks/types/event';
import { imageBlock } from './blocks/elements/image';
import { infoItemBlock } from './blocks/elements/info-item';
import { linkBlock } from './blocks/elements/link';
import { listItemBlock } from './blocks/elements/list-item';
import { logoBlock } from './blocks/elements/logo';
import { muxVideoAutoplayBlock } from './blocks/elements/mux-video-autoplay';
import { muxVideoPlayerBlock } from './blocks/elements/mux-video-player';
import { pageBlock } from './blocks/types/page';
import { personBlock } from './blocks/types/person';
import { postBlock } from './blocks/types/post';
import { postEmbedBlock } from './blocks/post-blocks/post-embed';
import { postGalleryBlock } from './blocks/post-blocks/post-gallery';
import { postHeadingBlock } from './blocks/post-blocks/post-heading';
import { postHtmlBlock } from './blocks/post-blocks/post-html';
import { postImageBlock } from './blocks/post-blocks/post-image';
import { postQuoteBlock } from './blocks/post-blocks/post-quote';
import { postTextBlock } from './blocks/post-blocks/post-text';
import { postWistiaBlock } from './blocks/post-blocks/post-wistia';
import { projectBlock } from './blocks/types/project';
import { settingsBlock } from './blocks/types/settings';
import { slideBlock } from './blocks/elements/slide';
import { teamBlock } from './blocks/elements/team';
import { testimonialBlock } from './blocks/elements/testimonial';
import { titleCopyBlock } from './blocks/elements/title-copy';
import { postCategoryDatasource } from './datasources/post-category';
import { themeDatasource } from './datasources/theme';
import { projectCategoryDatasource } from './datasources/project-category';
import { elementsFolder, pageBlocksFolder, postBlocksFolder, typesFolder } from './folders';
import { storyblokMuxAssetsFieldPlugin } from './field-plugins/storyblok-mux-assets';
import { storyblokSliderFieldPlugin } from './field-plugins/storyblok-slider';

export const schema = defineSchema({
  blocks: {
    blockBcorpBlock,
    blockContactBlock,
    blockDividerBlock,
    blockEventOverviewBlock,
    blockEventTextBlock,
    blockFeaturedEventBlock,
    blockGalleryBlock,
    blockHeroBlock,
    blockHeroBrandBlock,
    blockHoverGridBlock,
    blockHoverListBlock,
    blockImpactDetailsBlock,
    blockImpactStatementBlock,
    blockLogoWallBlock,
    blockMediaBlock,
    blockNextEventBlock,
    blockPastEventsBlock,
    blockPostsBlock,
    blockProjectCarouselBlock,
    blockProjectsFilteredBlock,
    blockProjectsSelectedBlock,
    blockSplitTextBlock,
    blockTeamBlock,
    blockTestimonialsBlock,
    blockTextBlock,
    blockTickerBlock,
    blockTruthsBlock,
    blockWorkTextBlock,
    copyBlock,
    eventBlock,
    imageBlock,
    infoItemBlock,
    linkBlock,
    listItemBlock,
    logoBlock,
    muxVideoAutoplayBlock,
    muxVideoPlayerBlock,
    pageBlock,
    personBlock,
    postBlock,
    postEmbedBlock,
    postGalleryBlock,
    postHeadingBlock,
    postHtmlBlock,
    postImageBlock,
    postQuoteBlock,
    postTextBlock,
    postWistiaBlock,
    projectBlock,
    settingsBlock,
    slideBlock,
    teamBlock,
    testimonialBlock,
    titleCopyBlock,
  },
  datasources: {
    postCategoryDatasource,
    themeDatasource,
    projectCategoryDatasource,
  },
  folders: {
    elementsFolder,
    pageBlocksFolder,
    postBlocksFolder,
    typesFolder,
  },
  fieldPlugins: {
    storyblokMuxAssetsFieldPlugin,
    storyblokSliderFieldPlugin,
  },
});

export type Schema = InferSchema<typeof schema>;
export type Blocks = Schema['blocks'];
export type FieldPlugins = Schema['fieldPlugins'];
export type Story = InferStory<Blocks, FieldPlugins>;
export type StoryMapi = InferStoryMapi<Blocks, FieldPlugins>;

// Type a component's props by block name: `Block<"hero">`.
export type Block<TName extends Blocks['name']> = BlockContent<
  Extract<Blocks, { name: TName }>,
  Blocks,
  FieldPlugins
>;

// Type a story by its content type(s): `StoryOf<"page">`.
export type StoryOf<TName extends Blocks['name']> = InferStory<
  Extract<Blocks, { name: TName }>,
  FieldPlugins,
  Blocks
>;

// A reference field after `resolve_relations`: the story, or its UUID if it wasn't resolved.
export type Relation<TName extends Blocks['name']> = string | StoryOf<TName>;

// Loose union of every block's content, for a dynamic component dispatcher.
export type AnyBlock = BlockContent<Blocks, Blocks, FieldPlugins>;
