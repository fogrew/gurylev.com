export class Theme {
  constructor(options) {
    this.options = options

    this._initTheme()
    this._initSwitcher()

    return this
  }
  _initTheme() {
    const savedTheme = localStorage.getItem('theme')

    if(savedTheme) {
      this.name = savedTheme
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.name = 'dark'
    } else if (this.options.name) {
      this.name = this.options.name
    }
  }
  _initSwitcher() {
    const nodeSwitcher = document.querySelector(this.options.queryThemeSwitcher)

    nodeSwitcher.addEventListener('click', event => this.toggleTheme())
  }
  get node() {
    return this.options.nodeThemeTarget
  }
  get name() {
    return this.node.dataset.theme
  }
  set name(name) {
    localStorage.setItem('theme', name)
    this.node.dataset.theme = name

    return name
  }
  toggleTheme() {
    const currentTheme = this.name
    const filterAnotherTheme = (theme) => currentTheme !== theme
    const anotherThemes = this.options.themes.filter(filterAnotherTheme)

    if(anotherThemes.length > 0) {
      this.name = anotherThemes[0]
    } else {
      throw new Error(`This node have only one theme`, this.node);
    }

    return name
  }
}
