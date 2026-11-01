# Система Управління Бібліотекою (Лаба 2)

## Встановлення
```bash
npm install bootstrap
npm install -D typescript webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin \
  style-loader css-loader sass sass-loader \
  eslint@8 @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier \
  mocha chai@4 @types/mocha @types/chai@4 tsx husky gh-pages
npm run prepare   # активує Husky
```
## Команди
`npm start` (dev, :9000) · `npm run build` · `npm run lint` · `npm test` · `npm run deploy`

## Vite (гілка `vite-migration`)
```bash
git checkout -b vite-migration
npm uninstall webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin style-loader css-loader sass-loader
npm install -D vite
git rm webpack.config.js
```
`vite.config.ts`:
```ts
import { defineConfig } from 'vite';
export default defineConfig({
  base: './', // відносні шляхи для gh-pages
  server: { port: 9000 },
  build: { outDir: 'dist' },
});
```
У `index.html` додай `<script type="module" src="/src/index.ts"></script>` (Vite не вставляє скрипт сам).
Скрипти: `"start": "vite"`, `"build": "vite build"`.

## Висновок: webpack vs Vite
webpack 5.112.2 compiled successfully in 5046 ms
VITE v8.3.5  ready in 197 ms