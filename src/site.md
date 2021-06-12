---
title: Факты об этом сайте
layout: home
---

## Доступность

* я постарался адаптировать сайт для удобного использования с десктопов, мобильных, текстовых браузеров, голосовых ассистентов
* по сайту можно перемещаться при помощи клавиатуры, фокус визуально отражается обводкой, все навигации снабжены кнопкой перейти к контенту
* пока что сайт неудобно воспринимать с часов

## Ссылки

* Стараюсь поддерживать доступность ссылок, при изменении ставлю редиректы. Пожалуйста, дайте знать, если вы нашли ссылку 404 на мой сайт!
* ссылки на внешние сайты помечаются иконкой, направленной вправо вверх

## Куки и идентификация

* Я нарочно никак не запоминаю пользователей. У меня нет рекламных трекеров, гугл аналитики и прочих не этичных внешних штук. Пока что есть несколько айфреймов ютуба в разделе выступлений, все с использованием youtube-nocookie. Планирую заменить их на хранение видео у себя.

## Динамическая информация

* Окружение: {{config.env}}
* Последний релиз сайта: {{config.release}}

## Общая техническая информация

* Гит: [github](https://github.com/fogrew/gurylev.com/) + персональный gitlab
* Задачи: [github issues](https://github.com/fogrew/gurylev.com/issues/)
* Хостинг: vercel.io
* CI: vercel.io
* Генератор статики: [11ty.dev](https://www.11ty.dev/)
* Админка: forestry.io

## Дизайн

* Темы: дневная: бежевый для фона, коричневый для текста и оранжевый для интерактивных элементов. ночная: тёмно-серый для фона, почти белый для текста и оранжевый для интерактивных элементов. Они выбираются автоматически на основе настроек системы
* Шрифты: Georgia для заголовков, нативный sans-serif шрифт твоей системы для всего остального. Внешних шрифтов не загружаю.

## Стили

* разделены в файловой системе по принципам Atomic Design
* написаны на чистом CSS с использованием методологии BEM
* не преобразуются при помощи препроцессоров вроде sass или postcss
* критические стили для загрузки первого экрана инлайнятся в страницы на этапе сборки
* не критические подгружаются асинхронно

## Шаблоны

* вёрстка написана с использованием 11ty, nunjucks, markdown