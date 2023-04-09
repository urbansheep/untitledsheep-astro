# Untitled Sheep with AstroJS

*Требования для AstroJS:*

- Node.js - v16.12.0 или новее
- npm v8 - идет в комплекте с Node 16
- AstroJS v2 - https://docs.astro.build/

*Настройки блога*

```
/
├── src/
│   └── config.ts
```

[Шаблон для блог-поста](TEMPLATE.md)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

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



## TODO

- заполнить config.ts и вытащить из него переменные в мета-теги и подвал
- оформление страниц с постами, тегами и архив
- подвал: стили для ссылки "rss"
- генерить rss
- добавить мета-тег rss в head
- генерить sitemap
- оптимизировать загрузку шрифтов
- баг с редиректом /post на /archive: https://github.com/withastro/astro/issues/6795
- PostCard и страница одного поста: вытащить функцию форматирования дат в /utils/dateFormating.js

страница одного тега
- фильтрация тегов: удалить "post"
- slugify: без спецсимволов, маленькие буквы

один пост:
- листалка страниц вперед-назад - ссылки
- проверить дизайн всех типов постов
- фильтрация тегов: удалить "post"
- проверить микроразметку постов
- проверить: блок с тегами выводится, если теги есть в посте, и это не 'post'

список постов:
- компонент поста
- листалка страниц

создать пост - он не должен появиться в списках (по тегу, весь архив) и на главной странице через рендом, нельзя на него зайти по прямому урлу
- если пост isDraft: true
- если дата поста больше текущей
