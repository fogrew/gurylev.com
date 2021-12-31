const path = require('path');
const fs = require("fs");
const webvtt = require('node-webvtt');
const csso = require('csso');

module.exports = {
  sortByDate: (posts) => {
    return posts.sort((a, b) => new Date(a.date) - new Date(b.date))
  },

  merge: (arrays) => {
    return arrays.flat()
  },

  /*
  * filterPostsByTags
  * @param {Object[]} posts - an eleventy posts collection
  * @param {string|string[]} tags - tag or tags for filtering
  * @return {Object[]} filtered posts
  *
  * @example
  *   filterPostsByTags(posts, 'posts', 'en')
  * @example
  *   filterPostsByTags(posts, 'posts')
  */
  filterPostsByTags: (posts, ...tags) => {
    return posts.filter(post =>
      post.data?.tags.some(tag =>
        tags.includes(tag)
      )
    )
  },

  published: (posts) => {
    return posts.filter(post => !post.data.draft)
  },

  unpublished: (posts) => {
    return posts.filter(post => post.data.draft == true)
  },

  readingTime: (postOrContent) => {
    if (!postOrContent || typeof postOrContent !== 'string') {
      return ``;
    }

    const content = postOrContent.replace(/(<([^>]+)>)/gi, '');
    const matches = content.match(/[\u0400-\u04FF]+|\S+\s*/g);
    const count = matches !== null ? matches.length : 0;
    const speed = 300;
    const estimatedTime = Math.ceil(count / speed);

    return estimatedTime;
  },

  readableDate: function(dateObj) {
    // TODO(i18n): adopt locales to 11ty templates correctly
    const locale = this?.ctx?.locale || this?.data?.locale

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(dateObj))
  },

  i18n: function(string) {
    const { strings, locale = 'en' } = this.ctx
    return locale ==='en' ? string : strings[locale][string]
  },

  getNoun: (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  },

  debugger: (...args) => {
    console.log(...args)

    debugger
  },

  log: (some) => {
    console.log(some)
  },

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  htmlDateString: (dateObj) => {
    const date = new Date(dateObj)
    return date.toISOString()
  },

  // Get the first `n` elements of a collection.
  head: (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  },

  // Get extension of URL
  extname: (stringUrl) => {
    return path.extname(stringUrl)
  },

  // Get parent folder from url
  // @example: 'this.parent("/blog/dotfiles/")' returns '/blog/'
  parent: (stringUrl) => {
    return stringUrl.match(/^(.*[\/]).*\/$/)?.[1]
  },

  // Get SVG content to inline
  inline: (stringPath) => {
    const newPath = path.join(__dirname, '../assets/', stringPath)
    const content = fs.readFileSync(newPath, 'utf8')

    return content
  },

  // Get SubRip subtitles as array of objects
  vtt: (stringPath) => {
    const newPath = path.join(__dirname, '../assets/', stringPath)
    const subtitles = fs.readFileSync(newPath, 'utf8')

    return webvtt.parse(subtitles).cues;
  },

  cssmin: (css) => {
    return csso.minify(css).css
  }
}
