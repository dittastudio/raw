// import type { Page } from '@@/.storyblok/types/289672313529140/storyblok-components'
import type { Themes } from '@@/types/app'

export interface ThemeColors {
  background: string
  text: string
  buttonBackground: string
  buttonText: string
}

const getThemeColors: Record<Themes, ThemeColors> = {
  dark: {
    background: 'var(--color-offblack)',
    text: 'var(--color-offwhite)',
    buttonBackground: 'var(--color-offwhite)',
    buttonText: 'var(--color-offblack)',
  },
  light: {
    background: 'var(--color-offwhite)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
  blue: {
    background: 'var(--color-blue)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
  green: {
    background: 'var(--color-green)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
  pink: {
    background: 'var(--color-pink)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
  purple: {
    background: 'var(--color-purple)',
    text: 'var(--color-offblack)',
    buttonBackground: 'var(--color-offblack)',
    buttonText: 'var(--color-offwhite)',
  },
}

const getThemeClasses: Record<Themes, string> = {
  dark: 'bg-offblack text-offwhite text-outline-offwhite-override',
  light: 'bg-offwhite text-offblack text-outline-offblack-override',
  blue: 'bg-blue text-offblack text-outline-offblack-override',
  green: 'bg-green text-offblack text-outline-offblack-override',
  pink: 'bg-pink text-offblack text-outline-offblack-override',
  purple: 'bg-purple text-offblack text-outline-offblack-override',
}

export { getThemeClasses, getThemeColors }
