import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-12",
        "text-16",
        "text-20",
        "text-24",
        "text-30",
        "text-38",
      ],
      "text-color": ["text-white", "text-black"],
    },
  },
});
