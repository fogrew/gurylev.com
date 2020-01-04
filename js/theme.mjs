export default class Theme {
  constructor(options) {
    this.options = options

    this._initTheme()
    this._initSwitcher()

    return this
  }
  _initTheme() {
    const { nodeThemeTarget } = this.options
    const savedTheme = localStorage.getItem('theme')

    if(savedTheme) {
      this.name = savedTheme
    } else if (this.options.name) {
      this.name = this.options.name
    }
  }
  _initSwitcher() {
    const nodeSwitcher = document.querySelector(this.options.queryThemeSwitcher)

    nodeSwitcher.addEventListener('click', event => this.toggleTheme())
  }
  get name() {
    return this.options.nodeThemeTarget.dataset.theme
  }
  set name(name) {
    localStorage.setItem('theme', name)
    this.options.nodeThemeTarget.dataset.theme = name

    return name
  }
  toggleTheme() {
    const currentTheme = this.name
    const anotherThemes = this.options.themes.filter(theme => currentTheme !== theme)

    if(anotherThemes.length > 0) {
      this.name = anotherThemes[0]
    } else {
      throw new Error(`This node have only one theme`, this.options.nodeThemeTarget);
    }

    return name
  }
}
