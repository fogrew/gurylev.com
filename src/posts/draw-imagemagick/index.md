---
title: Drawing via console
description: Using imagemagick instead of Photoshop from terminal
date: 2017-12-05
tags:
  - article
  - shell
  - snippets
preview: '/img/posts/fm2.png'
asyncStyles:
  - /css/plugins/code.css
---
## 🙀 They says that it happens

Imagine, I have run out of my Photoshop license. People says it happens sometimes. Following Muphy's Law, it immediately required to paint a picture — announce of August meetup [Frontend Mix](https://meetabit.com/events/piterjs-16). I'm strive to help [PiterJS community](http://piterjs.org) with meetups organizing by management part, SMM, and graphics.

In summary, I was sad. I was violently disappointed. Sadness for my inability, depression from hopelessness, something like that. I wrote to the guys that I'm helpless for some time - can't draw. Let them cope somehow. As a last resort, let them just insert the logo of PiterJS into announce as we did it earler.

## 🖌 Possible without an editor

But I can't give up so quickly...

Once again I googled alternatives for photoshop for editing raster graphics (I do it once in year). Once again made sure that there was nothing suittable. Most GUI absolutely unusable. It was terrible.

But it not stopped me. After all I can edit images without editor! What I love that is `command line interface`! Next I learned docs of CLI utility [imagemagick](www.imagemagick.org). After 20 minutes docs reading, I draw it

{% image '/img/posts/fm2.png', '', 'frontend mix', '(min-width: 768px) 940px, 100vw', '768,940', '940' %}

Googled how to o and stuck together two images. That's it! Elementary work. Nothing photoshop. Nothing difficult. It turned out to create a picture for announce not so hard. And one day learned it, in the future it is completely easy. So, with this I can forgot about Photoshop.

I draw it with this commands:

```bash
curl -o yandex-money.png http://www.4androidapk.net/data/programs/images/yandex-money-online-payments_1086.png
curl -o piterjs.png https://raw.githubusercontent.com/piterjs/resources/master/logo/PiterJS.png
convert piterjs.png -resize 512x512 fm-2piterjs.png
convert yandex-money.png -crop 588x588-38-38\! -flatten -resize 512x512 fm-1yandex-money.png
convert +append fm-*.png fm.png
convert -fill black -font Trebuchet -pointsize 72 -size 450x100 -gravity center label:Frontend\ Mix +antialias text.png
convert -append -gravity center text.png fm.png result.png
```

In general, there is happen something mess. Let's study it step by step.

## 👆 Pre-requirements

Of cource, here should be installed images utility in advance - imagemagick.
You can download it [here](http://www.imagemagick.org/script/download.php), then install it + add environment variables. By the way, I prefer to use habitual way for me: install it via [homebrew](https://brew.sh/index_ru.html).

``` bash
brew install imagemagick
```

## 🔍 Research

Firstly, I did non-console work.

> If you can't google, you can't life

The meetup organized by Yandex.Money in their office by supporting of PiterJS.
I didn't want to highlight someone importance, because for PiterJS it is another recurrence monthly meetup, not joining to another meetup, but for Yandex.Money it is meetup on their territory. So I tried to equal logos. As result: logos should be the same sizes - square.

With PiterJS it is simple. We have [speccial repository](https://github.com/piterjs/resources), where we store style guide. I copied the logo from there. Raster. In `png`.

With Yandex.Money it was harder a bit. I could not find the official style guide. So I had to google images. Keep it in mind and setting up in the search that I want the square, at least with side in 512 pixels. Firstly, I found suitable, but small square logo of android app of Yandex.Money, and then I found it [larger](http://www.4androidapk.net/data/programs/images/yandex-money-online-payments_1086.png). I used it for the announcement.

## ↭ Download and change sizes

So, here everything is simple: for downloading, all unix-machines have graceful `curl` with option `--output`, which I usually shorten to `-o`. After it, as first argument use the name of a new file, as second argument use the URL from which it should be downloaded. So, thus we're downloading two images into folder, where we are.

``` bash
curl -o yandex-money.png http://www.4androidapk.net/data/programs/images/yandex-money-online-payments_1086.png
curl -o piterjs.png https://raw.githubusercontent.com/piterjs/resources/master/logo/PiterJS.png
```

PiterJS logo too large for the announcement, 1024px. We need to reduce the size proportional.

Any images converting with the ImageMagick can be run with `convert` command. And resizing can be used with simple and logical argument `resize`.

I save into a new file to see the "progress" when all will be completed. To know after all on which step we had something wrong, if it will happen. I tell below why I name new file started with `fm`.

```bash
convert piterjs.png -resize 512x512 fm-2piterjs.png
```

Next it will be more interesting. Logo of Yandex.Money - 512x512px, as we need.
But with "air" something wrong. Haven't empty space at edges. We can just add the white background to all sides for 7-10%. I did round to 550px. And there И тут пошла математика (я её не люблю):

1. 550-512 = 38. Столько нужно добавить по краям.
2. 550+38 = 588. Так надо «обрезать» (в большую сторону) картинку, чтоб добавить место с краёв.

```bash
convert yandex-money.png -crop 588x588-38-38\! -flatten -resize 512x512 fm-1yandex-money.png
```

## 🙏 Склеиваем

Теперь, когда у нас есть два обрезанных лого, нам нужно их склеить. Я использую маску со звёздочкой `*` для поиска нужных файлов. `+append` означает, что нужно добавлять их один за другим. А `fm-` вначале я добавлял специально заранее, чтобы на этом этапе было проще картинки, которые нужно склеить.

```bash
convert +append fm-*.png fm.png
```

## ✍️ Подписываем

Конечно, склеенные картинки - это здорово. Но ни о чём не говорит любому, кто лисает ленту новостей. Поэтому пост нужно подписать. Причём сделать это нужно на картинке. Это важно, потому что концентрирует внимания больше текста поста.

Для начала создадим картинку, на которой будет написан текст. Тут почти css. `-fill` это `color` цвет для текста, `-font` это `font-family` семейство шрифта, `-pointsize` это `font-size` размер шрифта в пикселях, `-size` - размеры картинки, в которые текст будет вписан, `-gravity` - как `background-position` указывает положение в пространстве картинки, `label` указывает сам текст, и наконец `+antialias` добавляет человеческое сглаживание. Последним аргументом - имя файла.

```bash
convert -fill black -font Trebuchet -pointsize 72 -size 450x100 -gravity center label:Frontend\ Mix +antialias text.png
```

Будьте осторожнее с `-font`, он берёт не те же шрифты, что ваш css. Список шрифтов для него можно получить командой

```bash
convert -list font | grep "Font:" | sed "s/Font: //g"
```

Но можно и передать в `-font` путь до локального `.ttf` файла со шрифтом, может сработать.

Дальше остаётся только добавить текст к склеенным картинкам по аналогии с предыдущим склеиванием.

```bash
convert -append -gravity center text.png fm.png result.png
```

Здесь `append` указан с минусом вначале. Это говорит о том, что вставлять нужно вертикально.

Image**Magick**✨ же!{.note}

Вот и всё, картинка для анонса готова.

{% image '/img/posts/fm2.png', '', 'frontend mix', '(min-width: 768px) 940px, 100vw', '768,940', '940' %}
