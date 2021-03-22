const fs = require("fs");

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
  // Object.keys(shortcodes).forEach((shortcodeName) => {
  //   eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
  // })
  const path = require('path');
  const Image = require("@11ty/eleventy-img");

  function getExtensionFallbacks (src) {
    const extension = path.extname(src);

    switch (extension) {
      case '.jpg':
        return ['avif', 'webp', 'jpeg']
      case '.png':
        return ['avif', 'webp', 'png']
      case '.svg':
        return ['svg']
      default:
        return null
    }
  }

  async function imageShortcode(src, className, alt, sizes) {
    // get metadata even the images are not fully generated
    let source = path.join(__dirname, "./src/assets/" , src);
    let extensions = getExtensionFallbacks(src);
    let metadata = await Image(source, {
      outputDir: './dist/img/',
      urlPath: '/img/',
      widths: [400,690],
      formats: extensions,
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);

        return `${name}-${width}w.${format}`;
      }
    });

    console.log(metadata)

    let imageAttributes = {
      loading: "lazy",
      decoding: "async",
      class: className,
      sizes,
      alt
    };

    return Image.generateHTML(metadata, imageAttributes);
  }
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

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

  // console.log(eleventyConfig);

  return {
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      layouts: "_layouts",
      output: "dist"
    }
  };
};
