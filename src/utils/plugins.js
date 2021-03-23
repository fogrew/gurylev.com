const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-nesting-toc");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');

module.exports = {
  addPlugins: (eleventyConfig) => {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight);
    eleventyConfig.addPlugin(pluginNavigation);
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
      permalinkSymbol: "" // moved to ::after content to remove from table of contents
    })
    .use(markdownItAttrs)
  }
}
