# Untitled Sheep with AstroJS

*Требования для AstroJS:*

- Node.js - v16.12.0 или новее
- npm v8 - идет в комплекте с Node 16
- AstroJS v2 - https://docs.astro.build/

*Настройки блога* - `/src/config.ts`

[Шаблон для блог-поста](TEMPLATE.md)

Возможный формат постов: ['regular', 'link', 'quote', 'photo', 'photogallery', 'video', 'audio', 'chat']

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── content/blog/
│   │   └── blog-post.md
│   ├── layouts/
│   │   └── Layout.astro
│   ├── media/
│   ├── styles/
│   ├── utils/
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

- генерить rss: проверить после билда - последние 10 постов - баг https://github.com/withastro/astro/issues/6833
- добавить мета-тег rss в head: проверить после билда
- генерить sitemap
- оптимизировать загрузку шрифтов

страница "задать вопрос"
- форма сообщения: получение, валидация, отправка

один пост:
- проверить дизайн всех типов постов
- проверить микроразметку постов
- проверить: блок с тегами выводится, если теги есть в посте, и это не 'post'

создать пост - он не должен появиться в списках (по тегу, весь архив) и на главной странице через рендом, нельзя на него зайти по прямому урлу
- если пост isDraft: true
- если дата поста больше текущей

счетчики аналитики через partytown: настройка код счетчика в конфиге

темная тема оформления + переключатель
