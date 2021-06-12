---
title: Социо [ кнопки ]
description: О нативной замене прожорливым кнопкам «поделиться»
date: 2011-09-04
tags:
  - snippets
  - frontend
  - long-read
draft: true
---

Возможно, вы вставляли когда-нибудь официальные кнопки социальных сетей на сайты? Мне стало плохо, когда я это сделал впервые.

UPD: Этот пост я написал ещё в 2011 году ([смотри в веб-архиве](https://web.archive.org/web/20160506043601/http://grlv.ru/weblog/all/sharing/)), затем в 2015 запилил [отдельную страничку](https://github.com/fogrew/socio), а проблема ведь до сих пор актуальна в 2020. Сейчас я обновил пост, дополнив его информацией.

Давайте разберём…

## Официальные

Каждая социокнопка

* загружает по скрипту и по фрейму с документом // todo: привести пруфы
* замедляет загрузку ваших драгоценных страниц // todo: привести пруфы
* [позволяет соц. сетям следить за пользователями](https://habr.com/ru/post/378023/)
* не позволяет документу пройти W3C-валидацию // todo: пруфы
* ломает доступность // todo: пруфы
* вызывает ошибки в консоли браузера // todo: пруфы
* [блокируется при помощи AdBlock пользователями](https://easylist-downloads.adblockplus.org/fanboy-social.txt)

### Скрипт + фрейм
### Замедляет
### Ломает валидность
### Ломает доступность
### Вызывает ошибки
### Блокируется адблоком

## Генераторы

Вообще говоря, многие из этих ошибок избегают генераторы кнопок соц. шаринга.

Сервисы

* AddToAny
* AddThis
* ShareThis

Скрипты

* Яндекс.Поделиться
* Pluso
* Share42
* uSocial.pro
* Лайкли
* Shareon https://shareon.js.org/
uptolike.ru

## Ссылки

В большинстве случаев можно обойтись одной лишь простой ссылкой с добавлением нужных GET-параметров.

// todo: сократить визуально этот раздел. мб сделать конструктор

### Социальные сети

* **Twitter**: <code contenteditable><span>https[](#)://twitter.com/intent/tweet?</span>text=<mark>text</mark>&url=<mark>url</mark>&hashtags=<mark>hashtags</mark>&via=<mark>@fogrew</mark></code>
* **Facebook**: <code contenteditable>https[](#)://www.facebook.com/sharer.php?u=<mark>url</mark>&title=<mark>title</mark>&description=<mark>description</mark>&picture=<mark>picture</mark></code>
* **Вконтакте**: <code contenteditable>https[](#)://vk.com/share.php?url=<mark>url</mark>&title=<mark>title</mark>&description=<mark>description</mark>&image=<mark>image</mark></code>
* **LinkedIn**: `https://www.linkedin.com/shareArticle?mini=true`
  Параметры: url, title, summary: description
* **Мой мир**: `https://connect.mail.ru/share`
  Параметры: url, title, description
* **Одноклассники**: `https://connect.ok.ru/offer`
  Параметры: url, title, description, imageUrl
* **Pinterest**: `https://pinterest.com/pin/create/button/`
  Параметры: url, media, description

### Мессенджеры

* **Telegram**: `https://telegram.me/share/url`
  Параметры: url, text
* **Skype**: `https://web.skype.com/share`
  Параметры: url, text
* **WhatsApp**: `https://wa.me/`
  Параметры: text
* **Line**: `https://lineit.line.me/share/ui`
  Параметры: url, text

### Блоговые системы

* **Блоггер**: `https://www.blogger.com/blog-this.g`
  Параметры: t: description, u: url, n: title
* **Живой журнал**: `https://www.livejournal.com/update.bml`
  Параметры: event: url
* **Reddit**: `https://reddit.com/submit`
  Параметры: url, title
* **Tumblr**: `https://www.tumblr.com/widgets/share/tool`
  Параметры: canonicalUrl: url, title, caption: text, tags: hash_tags

### Системы закладок

* **Pocket**: `https://getpocket.com/save`
  Параметры: url, title
* **Evernote**: `https://www.evernote.com/clip.action`
  Параметры: title, body: description, url

### Федивёрс

* Mastodon
* Diaspora
* Friendica
* Pleroma
* Movim
* PixelFed
* Micro.blog

Остаётся только стилизовать их и состояния (ховер и т.п).

Код и кол-во обращений к серверам уменьшены, никаких лишних тяжёлых картинок, никаких ошибок в скриптах и всё валидно.

Пользователю будет удобно определять нужную социалку не только по картинке, но и по названию. Мне нравится идея превратить названия социалок в глаголы.
Отправить в «твиттер» — твитнуть,
Отправить во «в контакте» — сохранить,
Отправить в «фейсбук» — поделиться,
Отправить в гугл+ — рассказать,
Отправить в ЖЖ — прожужжать.
Чтоб вы знали: так жить было бы легче.

## Сценарии

Отложить - читалки - про то, чтобы почитать потом из удобного места, обычно важно до чтения статьи
Переслать конкретному человеку - мессенджеры - чтобы переслать другому человеку, обычно важно сейчас
Поделиться с обществом - соц. сети - чтобы просто распространить, не к спеху
Поделиться с читателями - свой сайт - тоже чтобы распространить, но модель репостов сложная
лайк - одобрение автору - чаще без распространения

## Сравнение

https://uguide.ru/kak-podkljuchit-knopki-socialnykh-setej-dlja-sajta

## Доступность

Добавлять шаринг только в те сеточки, которыми пользуешься - делать недоступно.

// todo: рассказать и про a11y

## Иконки

[Evil Icons](https://evil-icons.io/)

## Блокировщики рекламы

Блокировки есть в разных списках
[fanboy-social](https://easylist-downloads.adblockplus.org/fanboy-social.txt)
Это осознанный выбор пользователей!

## Web share

[web.dev](https://web.dev/web-share/)
