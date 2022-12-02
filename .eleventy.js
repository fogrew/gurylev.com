const fs = require("fs");
const csv = require('@fast-csv/parse');

const plugins = require("./src/utils/plugins")
const filters = require("./src/utils/filters")
const shortcodes = require("./src/utils/shortcodes")
const collections = require("./src/utils/collections")
const pathsPassthrough = require("./src/utils/pathsPassthrough")

module.exports = function(eleventyConfig) {
  /**
   * Add plugins
   *
   * @link https://www.11ty.dev/docs/plugins/
   */
  plugins.addPlugins(eleventyConfig)

  /**
   * Add filters
   *
   * @link https://www.11ty.io/docs/filters/
   */
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  /**
   * Add collections
   *
   * @link https://www.11ty.dev/docs/collections/
   */
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  })

  /**
   * Add shortcodes
   *
   * @link https://www.11ty.io/docs/shortcodes/
   */
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addNunjucksAsyncShortcode(shortcodeName, shortcodes[shortcodeName]);
    eleventyConfig.addLiquidShortcode(shortcodeName, shortcodes[shortcodeName]);
    eleventyConfig.addJavaScriptFunction(shortcodeName, shortcodes[shortcodeName]);
  })

  eleventyConfig.addUrlTransform(({url}) => {
    const postsFolderName = '/posts'

    if(url.startsWith(postsFolderName)) {
      return url.slice(postsFolderName.length)
    }
  });

  eleventyConfig.addUrlTransform(({url}) => {
    console.log(url)
    const postsFolderName = 'privacy'

    if(url.startsWith(postsFolderName)) {
      return url.slice(postsFolderName.length)
    }
  });

  // eleventyConfig.addUrlTransform(({url}) => {
  //   // `url` is guaranteed to be a string here even if you're using `permalink: false`
  //   const postsFolderName = 'posts'
  //   const defaultFileName = 'index'
  //   const postfixLocalisation = '\.[a-z]{2}'
  //   const reLocalisedIndexFile = new RegExp(`(${postsFolderName}\/)?(.+)\/(${defaultFileName})?${postfixLocalisation}\.html`)
  //   const matchLocalisedPosts = url.match(reLocalisedIndexFile)
  //   const hasLocalisedIndexFile = matchLocalisedPosts.length === 3
  //   const hasLocalisation = matchLocalisedPosts.length === 1 || hasLocalisedIndexFile

  //   if(hasLocalisation) {
  //     console.log()
  //   }
  //   // Returning undefined skips the url transform.
  // });

  eleventyConfig.addDataExtension("csv", async (contents) => {
    const rows = []

    return await new Promise((resolve, reject) => {
      csv.parseString(contents, { headers: true })
        .on('error', error => {
          reject(error)
        })
        .on('data', row => {
          rows.push(row)
        })
        .on('end', () => {
          resolve(rows)
        });
    })
  });

  /**
   * Passthrough file copy
   *
   * @link https://www.11ty.io/docs/copy/
   */
  pathsPassthrough.forEach(path => eleventyConfig.addPassthroughCopy(path));

  /**
   * Set custom markdown library instance
   *
   * @link https://www.11ty.dev/docs/languages/liquid/#optional-set-your-own-library-instance
   */
  eleventyConfig.setLibrary("md", plugins.markdown());

  /**
   * Opts in to a full deep merge when combining the Data Cascade.
   *
   * @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
   */
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addWatchTarget('./src/assets/css/**/*.css');
  eleventyConfig.addWatchTarget('./src/utils/**/*.js');

  /**
   * Override BrowserSync Server options
   *
   * @link https://www.11ty.dev/docs/config/#override-browsersync-server-options
   */
  eleventyConfig.setBrowserSyncConfig({
    files: [
      'css',
      'js',
      'mjs'
    ],
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });
  eleventyConfig.setQuietMode(true);
  // console.log(eleventyConfig);

  return {
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    jsDataFileSuffix: ".data",
    dir: {
      input: "src",
      layouts: "_layouts",
      output: "dist"
    }
  };
};
