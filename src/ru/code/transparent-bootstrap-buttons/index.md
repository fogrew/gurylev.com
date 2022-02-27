---
title: Прозрачные кнопки для бутстрапа
description: Раз в неделю трачу часа два на воплощение идеи в код
date: 2014-10-29
tags:
  - snippets
asyncStyles:
  - /css/plugins/code.css
  - /css/pages/transparent-bootstrap-buttons.css
---
Bootstrap 3.2.
Стандартное поведение кнопок при наведении курсора — затемняться. Сделаем их прозрачными, чтоб на фоне фотографии они смотрелись красиво. Как дизайнер хочет.

```css
{{ asyncStyles | last | inline }}
```
<div class="pane standart">
  <p>Standard bootstrap 3.2 buttons</p>
  <button class="btn btn-default">Button</button>
  <button class="btn btn-primary">Button</button>
  <button class="btn btn-success">Button</button>
  <button class="btn btn-info">Button</button>
  <button class="btn btn-warning">Button</button>
  <button class="btn btn-danger">Button</button>
</div>
<div class="pane outline">
  <p>Button outline style</p>
  <button class="btn btn-default btn-outline">Button</button>
  <button class="btn btn-primary btn-outline">Button</button>
  <button class="btn btn-success btn-outline">Button</button>
  <button class="btn btn-info btn-outline">Button</button>
  <button class="btn btn-warning btn-outline">Button</button>
  <button class="btn btn-danger btn-outline">Button</button>
</div>
<div class="pane outline-inverse">
  <p>Button outline style on inverse background</p>
  <button class="btn btn-default btn-outline-inverse">Button</button>
  <button class="btn btn-primary btn-outline-inverse">Button</button>
  <button class="btn btn-success btn-outline-inverse">Button</button>
  <button class="btn btn-info btn-outline-inverse">Button</button>
  <button class="btn btn-warning btn-outline-inverse">Button</button>
  <button class="btn btn-danger btn-outline-inverse">Button</button>
</div>
<div class="pane compare">
  <p>For comparison</p>
  <button class="btn btn-success">Submit</button>
  <button class="btn btn-danger btn-outline">Cancel</button>
</div>
