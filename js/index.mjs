import { Theme } from './theme.mjs'

const nodeThemeTarget = document.documentElement

new Theme({
  name: 'light',
  themes: ['light', 'dark'],
  queryThemeSwitcher: '.theme-switcher',
  nodeThemeTarget,
})
