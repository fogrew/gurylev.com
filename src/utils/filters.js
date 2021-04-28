const path = require('path');
const fs = require("fs");
const webvtt = require('node-webvtt');

module.exports = {
  published: (posts) => {
    return posts.filter(post => !post.data.draft)
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

  readableDate: (dateObj) => {
    return new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(dateObj))
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
  }
}
