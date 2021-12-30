---
title: Стайлус и переменные
description: Пробрасываем переменные в фоновую SVG-иконку
date: 2017-09-29
tags:
  - snippets
  - evening_task
asyncStyles:
  - /css/plugins/code.css
  - /css/pages/stylus-icon.css
preview: '/img/posts/stylus-icon.svg'
---
Я замутил самому себе конкурс «вечерняя тасочка», чтобы как-то оправдывать своё безделье.

Тасочка этого вечера: научился в стайлусе пробрасывать переменные в строковые переменные, содержащие URL-encoded SVG. Без написания плагинов к стайлусу, только миксинами и встроенными методами.

Теперь удобно храню SVG в стилях и не нуждаюсь в дублировании в исходниках (для обычного и наведённого состояний иконок).

Применимо только для мелких иконок, которые дешевле заинлайнить, чем подключать отдельно! И то в редких случаях. Обычно удобнее использовать спрайт из svg-символов, а при наведении нужные свойства менять через css. Это надёжнее и поддерживает плавность.

Иногда хочется не обращаться к файловой системе, потому решил найти способ инлайнить с передачей цветовой палитры проекта.

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

Этой фигнёй я занимаюсь в рамках конкурса для себя самого, который я назвал «вечерняя тасочка». Посты этой категории буду тегировать [#evening_task](/tags/evening_task/)
