---
title: Transparent buttons for bootstrap 3.2
description: Once in week I spend two hours to developing a idea
date: 2014-10-29
tags:
  - snippets
asyncStyles:
  - /css/plugins/code.css
  - /css/pages/transparent-bootstrap-buttons.css
---
Bootstrap 3.2.
Default behaviour of buttons on hover - stay darker. Let's made it transparent to on photos on background they looks great. As designer want.

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
