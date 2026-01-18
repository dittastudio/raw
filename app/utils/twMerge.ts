import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-14',
        'text-16',
        'text-20',
        'text-26',
        'text-28',
        'text-32',
        'text-42',
        'text-50',
        'text-84',
        'text-fluid-h1',
        'text-fluid-h2',
        'text-fluid-h3',
        'text-fluid-h4',
        'text-fluid-h5',
        'text-fluid-p',
      ],
      'text-color': [
        'text-white',
        'text-offwhite',
        'text-black',
        'text-offblack',
        'text-blue',
        'text-green',
        'text-pink',
        'text-purple',
      ],
    },
  },
})
