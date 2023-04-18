# Untitled Sheep with AstroJS

## Стек разработки

- Node.js - v16.12.0 или новее. Проверить версию: `node --version`
- npm v8 - идет в комплекте с Node 16. Проверить версию: `npm -v`
- AstroJS v2 - https://docs.astro.build/. Проверить версию: написано в файле package.json
- без библиотек стилей, самописный CSS

## 🚀 Project Structure

Структура папок и файлов:

```
/
├── .vscode/
│   └── *.json
├── public/
│   ├── static/
│   │   └── *.{jpg, png, gif}
│   ├── media/
│   │   └── *.{jpg, png, gif}
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── *.astro
│   ├── content/
│   │   └── blog/
│   │   │   └── *.md
│   │   └── config.ts
│   ├── layouts/
│   │   ├── LayoutBase.astro
│   │   └── LayoutContent.astro
│   ├── styles/
│   │   └── *.css
│   ├── utils/
│   │   └── *.{js, ts}
│   ├── pages/
│   │   └── *.{astro, mdx}
│   └── config.ts
└── package.json
```

Статичные файлы:
- для обычных страниц лежат в папке `/public/static/`,
- для постов - в папке `/public/media/`,
- остальные файлы можно складывать `public/`.

Страницы:
- Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Компоненты для шаблонов:
- There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                            |
| :--------------------- | :-----------------------------------------------  |
| `npm install`          | Installs dependencies                             |
| `npm run dev`          | Starts local dev server at `localhost:3000`       |
| `npm run dev:host`     | Starts local dev server in local network (mobile) |
| `npm run check`        | Run Astro checks                                  |
| `npm run test`         | Run linting and Astro checks before build         |
| `npm run build`        | Build your production site to `./dist/`           |
| `npm run preview`      | Preview your build locally, before deploying      |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check`  |
| `npm run astro --help` | Get help using the Astro CLI                      |

## Блог

*Настройки блога* - `/src/config.ts`

Пример:
    name: 'untitled',
    title: '*Безымянная овца*',
    description: 'Untitled Urbansheep',
    url: 'https://untitled.urbansheep.com',
    postsPerPage: 7, // Posts per page (pagination) on website
    postsPerFeed: 10, // Posts per feed on RSS

## Пост

*Настройки постов* - `/src/content/config.ts`

[Шаблон для блог-поста](TEMPLATE.md)

Возможный формат постов: ['regular', 'link', 'quote', 'photo', 'photogallery', 'video', 'audio', 'chat']

Название файла для поста: `src/content/blog` + NNN.md
NNN - любое отсутствующее в папке постов.
То же самое число указывать в качестве ID поста в самом файле.
Сортировка постов в архиве идет по дате.

## TODO

создать пост - он не должен появиться в списках (по тегу, весь архив, RSS, sitemap) и на главной странице через рендом, нельзя на него зайти по прямому урлу
- если пост isDraft: true
- если дата поста больше текущей (случайно, в будущем)
- проверить: блок с тегами выводится только в случае, если теги есть в посте - на странице поста и в карточке поста

оптимизировать загрузку шрифтов

страница "задать вопрос" - сделала статичной страницей, пока нет ответа, куда отправлять тексты сообщений
- форма сообщения: получение, валидация, отправка

добавить типограф постов

добавить компрессию файлов: в файле `astro.config.mjs` раскомментировать блок compress. Иногда есть проблемы с пакетом sharp в зависимостях, поэтому может локально не работать.

счетчики аналитики через partytown: настройка код счетчика в конфиге

темная тема оформления + переключатель темы

добавить микроразметку постов
