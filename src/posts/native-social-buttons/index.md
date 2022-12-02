---
title: Socio-buttons
description: Use static “Share” buttons
date: 2011-09-04
tags:
  - article
  - snippets
  - sharing
asyncStyles:
  - /css/plugins/code.css
---

Any sharing script from social networks downloading insane amount of iframes, which sooo long loading, and some of them invalid and/or have errors in scripts. I'm not ready to use it on my site.

In most cases you can use just a link.

For twitter: `http://twitter.com/intent/tweet?url=page_address`
For facebook: `http://facebook.com/sharer.php?u=page_address`
For VK: `http://vk.com/share.php?url=page_address`

etc.

They have additional parameters like `image` and `title`, which they can take from header.

You should only image styles and states for them.

Code and count of network requests was reduced, no more heavy-weight unneeded images, no more errors from scripts and everything is valid.
