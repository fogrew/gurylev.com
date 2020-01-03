import Theme from './theme.mjs'

class Site {
  constructor(options) {
    Object.assign(this, options)

    this.theme = new Theme({
      name: 'light',
      themes: ['light', 'dark'],
      queryThemeSwitcher: '.theme-switcher',
      nodeThemeTarget: document.body,
    })
  }
}
new Site()
