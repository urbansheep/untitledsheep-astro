# Untitled Sheep with AstroJS

-   Node.js - v18.14.1 или новее. Проверить версию: `node --version`
-   npm v8 - идет в комплекте с Node 18. Проверить версию: `npm -v`
-   AstroJS v3 - https://docs.astro.build/. Проверить версию: написано в файле package.json
-   без библиотек стилей, самописный CSS

## 🚀 Project Structure

Структура папок и файлов:

```
/
├── .vscode/
│   └── *.json
├── public/
│   ├── rss/
│   │   └── styles.xsl
│   ├── favicon.png
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── media/
│   │   │   └── *.{jpg, png, gif}
│   ├── components/
│   │   └── *.astro
│   ├── content/
│   │   └── blog/
│   │   │   └── *.md
│   │   └── config.ts
│   ├── layouts/
│   │   ├── LayoutBase.astro
│   │   └── LayoutContent.astro
│   ├── og-templates/
│   │   ├── *.ttf
│   │   └── templates.ts
│   ├── pages/
│   │   └── *.{astro, mdx, ts, js}
│   ├── styles/
│   │   └── *.css
│   ├── utils/
│   │   └── *.{js, ts}
│   └── config.ts
└── package.json
```

**Статичные файлы**:
-   картинки для статичных страниц - в папке `/src/assets/*` (оптимизируются средствами AstroJS),
-   остальные файлы - для обычных страниц будут в папке `/public/static/*`,
-   картинки - для постов - в папке `/src/assets/media/*` (оптимизируются средствами AstroJS),
-   остальные файлы можно складывать `public/*`.

**Страницы**:
-   Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

**Компоненты для шаблонов**:
-   There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                            |
| :--------------------- | :------------------------------------------------ |
| `npm install`          | Installs dependencies                             |
| `npm run dev`          | Starts local dev server at `localhost:3000`       |
| `npm run dev:host`     | Starts local dev server in local network (mobile) |
| `npm run check`        | Run Astro checks                                  |
| `npm run test`         | Run linting and Astro checks before build         |
| `npm run build`        | Build your production site to `./dist/`           |
| `npm run preview`      | Preview your build locally, before deploying      |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check`  |
| `npm run astro --help` | Get help using the Astro CLI                      |

**Линтеры для этапа разработки**:

-   JS
-   CSS
-   editor-config
-   local from Astro

## Блог

_Настройки блога_ - `/src/config.ts`

Пример:
-   name: 'untitled',
-   title: '_Безымянная овца_',
-   description: 'Untitled Urbansheep',
-   url: 'https://untitled.urbansheep.com',
-   postsPerPage: 10, // Posts per page (pagination) on website
-   postsPerFeed: 10, // Posts per feed on RSS

## Пост

_Настройки постов_ - `/src/content/config.ts`

[Шаблон для блог-поста](TEMPLATE.md)

Возможный формат постов: ['regular', 'link', 'quote', 'photo', 'photogallery', 'video', 'audio', 'chat']

Название файла для поста: `src/content/blog` + NNN.md
NNN - любое отсутствующее в папке постов.
То же самое число указывать в качестве ID поста в самом файле.
Сортировка постов в архиве идет по дате.

## Фичи блога

- посты из markdown (Content Collections - AstroJS)
- черновики постов (draft) не публикуются нигде
- картинки автоматически оптимизируются: из jpg/png становятся webp или avif
- динамическая генерация og:image для постов
- локальные кастомные шрифты
- RSS
- sitemap


## TODO

- [ ] Critical: твиттер-посты были в Тумблере, но пропали. Твиты в виде урлов видны в скачанном XML фиде.
Пример: https://before-untitled.urbansheep.com/post/4563589 - тут был твит https://twitter.com/urbansheep/status/126529662. Сейчас только ручками добавить.
-   https://astro-tweet-demo.vercel.app/

добавить CSP (content secutiry policy) для постов с твитами и youtube iframe.
проверить на посте https://untitled.urbansheep.com/post/49167864117/

создать пост - он не должен появиться в списках (по тегу, весь архив, RSS, sitemap) и на главной странице через рендом, нельзя на него зайти по прямому урлу
-   если пост isDraft: true
-   если дата поста больше текущей (случайно, в будущем)
-   проверить: блок с тегами выводится только в случае, если теги есть в посте - на странице поста и в карточке поста

страница "задать вопрос" - сделала статичной страницей, пока нет ответа, куда отправлять тексты сообщений

-   форма сообщения: получение, валидация, отправка

- [ ] динамическая генерация картинок для og:image - сделано, но на Vercel хостинге не работает
- https://egghead.io/lessons/astro-implement-dynamic-og-image-generation-with-astro-api-routes-and-satori

темная тема оформления + переключатель темы
- https://www.youtube.com/watch?v=I6ynSVZdX04

- [ ] добавить микроразметку постов

поиск
-   PageFind https://www.youtube.com/watch?v=v79VRrfVau8 или
-   FuseJS - https://www.youtube.com/watch?v=XnV_2MWqAhQ

- [ ] добавить типограф постов
- [ ] добавить aria-label везде
- [ ] перейти с компонента Image на компонент Picture (AstroJS)
- [ ] счетчики аналитики через partytown: настройка код счетчика в конфиге


https://www.npmjs.com/package/astro-embed - для ембедов

https://github.com/delucis/astro-auto-import - для автоимпорта компонентов в mdx
