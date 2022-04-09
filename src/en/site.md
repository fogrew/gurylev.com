---
title: Facts about this site
permalink: /site/index.html
layout: home
eleventyNavigation:
  key: About site
  excerpt: Tools, design, privacy policy, terms of terms
  parent: Andrey Gurylev
---

## Accessibility

* I tried to adapt the site for convenient use from desktops, mobile, text browsers, voice assistants.
* the site can be navigated using the keyboard, the focus is visually reflected by the stroke, all navigations are equipped with a go to content button.
* so far, the site is inconvenient to perceive from the clock

## Links

* I strive to maintain the availability of links, when changing, I set redirects. Please let me know if you found a 404 link to my website!
* links to external sites are marked with an icon pointing up to the right

## Cookies and identification

* I purposely don't remember users in any way. I don't have advertising trackers, Google Analytics and other unethical external things. So far, there are several YouTube iframes in the performances section, all using youtube-nocookie. I plan to replace them with video storage at home.

## Dynamic variables

* Environment: {{config.env}}
* Last release date: {{config.release}}

## Tools

* Git: [github](https://github.com/fogrew/gurylev.com/) + personal gitlab
* Tasks: [github issues](https://github.com/fogrew/gurylev.com/issues/)
* Hosting: [Cloudflare Pages](https://pages.cloudflare.com/) and reserved: vercel.io
* CI: [Cloudflare Pages](https://pages.cloudflare.com/) and reserved: vercel.io
* Static generator: [11ty.dev](https://www.11ty.dev/)
* Admin panel: forestry.io

## Design

* Themes:
  * Daytime: beige for background, brown for text and orange for interactive elements.
  * Night: dark gray for background, almost white for text and orange for interactive elements. They are selected automatically based on the system settings
* Fonts: Georgia for headers, native sans-serif font of your system for everything else. I don't upload external fonts.

## Styles

* are separated in the file system according to the principles of Atomic Design
* written in pure CSS using the BEM methodology
* they are not converted using preprocessors like sass or postcss
* critical styles for loading the first screen are embedded in the pages at the build stage of eleventy
* non-critical ones are loaded asynchronously

## Templates

* the templates is written using 11ty, nunjucks, markdown
