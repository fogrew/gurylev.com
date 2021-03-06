const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const pluginPWA = require("eleventy-plugin-pwa");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItSpan = require('markdown-it-bracketed-spans');

module.exports = {
  addPlugins: (eleventyConfig) => {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(pluginNavigation);
    if(process.env.ELEVENTY_ENV === 'production') {
      eleventyConfig.addPlugin(pluginPWA, {
        cacheId: 'gurylev',
        globPatterns: [
          "**/*.{html,css,js,mjs,map,jpg,png,gif,webp,avif,ico,svg,woff2,woff,eot,ttf,otf,ttc,json}"
        ],
        runtimeCaching: [
          {
            urlPattern: /^.*\.(html|css|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
            handler: `staleWhileRevalidate`
          }
        ]
      });
    }
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
      permalink: true,
      permalinkClass: "anchor",
      permalinkSymbol: "", // moved to ::after content to remove from table of contents
      permalinkBefore: true,
      permalinkAttrs: slug => ({ 'aria-label': `Перейти к заголовку «${decodeURIComponent(slug).replace('-', ' ')}»` })
    })
    .use(markdownItSpan)
    .use(markdownItAttrs)
  }
}
