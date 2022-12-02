const { EleventyI18nPlugin } = require("@11ty/eleventy");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const pluginPWA = require("eleventy-plugin-pwa");
// const i18n = require('eleventy-plugin-i18n');

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItSpan = require('markdown-it-bracketed-spans');
const slugify = require('slugify');
// const strings = require('../_data/strings.js');

module.exports = {
  addPlugins: (eleventyConfig) => {
    eleventyConfig.addPlugin(EleventyI18nPlugin, {
      // any valid BCP 47-compatible language tag is supported
      defaultLanguage: "en",
      errorMode: "allow-fallback"
    });
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(pluginNavigation);
    // if(process.env.ELEVENTY_ENV === 'production') {
    //   eleventyConfig.addPlugin(pluginPWA, {
    //     cacheId: 'gurylev',
    //     globPatterns: [
    //       "**/*.{html,css,js,mjs,map,jpg,png,gif,webp,avif,ico,svg,woff2,woff,eot,ttf,otf,ttc,json}"
    //     ],
    //     runtimeCaching: [
    //       {
    //         urlPattern: /^.*\.(html|css|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
    //         handler: `staleWhileRevalidate`
    //       }
    //     ]
    //   });
    // }
    eleventyConfig.addPlugin(pluginTOC, {
      headingText: '',
      wrapperClass: 'toc__nav'
    });
  },
  markdown: () => {
    return markdownIt({
      html: true,
      breaks: true,
      linkify: true
    })
    .use(markdownItAnchor, {
      slugify: s => slugify(s),
      permalink: markdownItAnchor.permalink.ariaHidden({
        class: 'anchor',
        symbol: '', // moved to ::after content to remove from table of contents
        renderAttrs: slug => ({
          'aria-label': `Перейти к заголовку «${decodeURIComponent(slug).replace(/-/g, ' ')}»`
        }),
        placement: 'before'
      })
    })
    .use(markdownItSpan)
    .use(markdownItAttrs)
  }
}
