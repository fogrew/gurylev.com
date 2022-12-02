---
title: Stylus and variables
description: Passing variables to backgound SVG-icon
date: 2017-09-29
tags:
  - snippets
  - evening_task
asyncStyles:
  - /css/plugins/code.css
  - /css/pages/stylus-icon.css
preview: '/img/posts/stylus-icon.svg'
---
I imagined for itself contest “evening task” to justify my idlness.

Task of this evening: I'm learned passing variables to strings with URL-encoded SVG. Withpout writing stylus plugin, only with mixins and build-in methods.

Now I store SVG icons in styles useful and do not need duplicate the icons source in source code for default and hover states of icons.

## Disclaimer

I recommend use it only for small-weight icons which can be cheaper to store in styles than connect separately! And also in rarely cases. Usually it may be more useful to use sprite with SVG-symbols and change a properties on hover from CSS. It will be more reliable and it support smooth backgound change with transition.

Sometimes I want do not ask file system, so I decided to find solution with inlining with passing ccolor scheme of project.

```stylus
$link-color = "#ffffff"
$link-color-hover = "#00afff"

urled(color) {
  unquote(replace("#", "%23", color))
}

icon(svg, clrs) {
  s(svg, urled(clrs[0]), urled(clrs[1]))
}

$demo-svg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19'%3E%3Cg fill='none' fill-rule='evenodd' transform='translate%281 1%29'%3E%3Ccircle cx='8.5' cy='8.5' r='8.5' stroke='%s'/%3E%3Cpath fill='%s' d='M11.6 8.4l-5 3.5V5'/%3E%3C/g%3E%3C/svg%3E%0A"

$demo-icon = icon($demo-svg, $link-color $link-color)
$demo-icon-hover = icon($demo-svg, $link-color-hover $link-color-hover)

.icon {
  display: block
  width: 180px
  height: 180px
  background-image: url($demo-icon)
  background-size: 180px
  cursor: pointer
  transition: 1s background // Warning! Image transition not supported in ff and ie
  &:hover {
    background-image: url($demo-icon-hover)
  }
}
```

<div class="stylus-icon"><div class="icon"></div></div>

This bullshit I do in within my contest for myself which I called “evening task”. Articles in this category will be tagged by [#evening_task](/tags/evening_task/)
