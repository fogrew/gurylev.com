const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginTOC = require("eleventy-plugin-nesting-toc");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItSpan = require('markdown-it-bracketed-spans');
const slugify = require('slugify');

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
      slugify: s => slugify(s),
      permalink: markdownItAnchor.permalink.ariaHidden({
        class: 'anchor',
        symbol: '', // moved to ::after content to remove from table of contents
        renderAttrs: slug => ({
          'aria-label': `Move to heading «${decodeURIComponent(slug).replace(/-/g, ' ')}»`
        }),
        placement: 'before'
      })
    })
    .use(markdownItSpan)
    .use(markdownItAttrs)
  }
}
