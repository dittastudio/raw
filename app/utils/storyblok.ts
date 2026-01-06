import type {
  Image,
  Page,
  Project,
  Vimeo,
} from "@@/.storyblok/types/289672313529140/storyblok-components";
import type { StoryblokRichtext } from "@@/.storyblok/types/storyblok";
import type App from "@@/types/app";
import type { ImageModifiers } from "@nuxt/image";
import type { ISbStoryData } from "@storyblok/js";
import type { LocationQuery } from "vue-router";

const storyblokEditor = (search: LocationQuery) => "_storyblok" in search;

const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "bmp",
  "svg",
  "avif",
];
const videoExtensions = ["mp4", "webm", "ogg"];

const storyblokAssetType = (filename: string): "image" | "video" | "other" => {
  if (typeof filename !== "string" || !filename?.trim().length) {
    return "other";
  }

  const ext = filename.split(".").pop() || "";

  if (imageExtensions.includes(ext)) {
    return "image";
  } else if (videoExtensions.includes(ext)) {
    return "video";
  }

  return "other";
};

const storyblokRichTextContent = (
  richtext: StoryblokRichtext | undefined
): boolean => Boolean(richtext?.content?.[0]?.content?.length);

const storyblokSlug = (path: string): string =>
  ["/", ""].includes(path) ? "/home" : path.replace(/\/+$/, "");

const isBlockProject = (
  block: App.BlockTypes
): block is Extract<App.BlockTypes, { component: "block_project" }> =>
  block.component === "block_project";

const isImage = (media: Image | Vimeo): media is Image =>
  media.component === "image";

const isProject = (
  story: ISbStoryData<Page | Project> | null | undefined
): story is ISbStoryData<Project> =>
  Boolean(story?.content?.component === "project");
const isPage = (
  story: ISbStoryData<Page | Project> | null | undefined
): story is ISbStoryData<Page> => Boolean(story?.content?.component === "page");

const storyblokImage = (
  filename: string | null | undefined,
  modifiers?: Partial<ImageModifiers> | undefined
): string => {
  const image = useImage();

  const path = image(filename ?? "", {
    width: 0,
    height: 0,
    smart: false,
    quality: 80,
    blur: 0,
    format: "webp",
    ...modifiers,
  });

  return path;
};

const storyblokImageDimensions = (
  filename: string | null | undefined
): { width: number; height: number } => {
  if (!filename?.length) {
    return {
      width: 0,
      height: 0,
    };
  }

  const parts = filename.split("/");

  if (!parts[5]?.includes("x")) {
    return {
      width: 0,
      height: 0,
    };
  }

  const [width, height] = parts[5].split("x");

  return { width: Number(width), height: Number(height) };
};

export {
  isBlockProject,
  isImage,
  isPage,
  isProject,
  storyblokAssetType,
  storyblokEditor,
  storyblokImage,
  storyblokImageDimensions,
  storyblokRichTextContent,
  storyblokSlug,
};
