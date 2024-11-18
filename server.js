const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const path = require('path');
const delay = require('koa-slow');

// Создаем экземпляры Koa и Router
const app = new Koa();
const router = new Router();

// Middleware для задержки
app.use(delay({ delay: 2000 })); // имитируем задержку в 2 секунды

// Маршрут для статических файлов (например, изображения, стили, скрипты)
app.use(static(path.join(__dirname, 'src')));

// Основной маршрут для загрузки данных
router.get('/news', async (ctx) => {
  // Имитация данных
  const news = [
    { title: 'Фильм 1', description: 'Описание фильма 1' },
    { title: 'Фильм 2', description: 'Описание фильма 2' },
    { title: 'Фильм 3', description: 'Описание фильма 3' },
  ];
  ctx.body = news;
});

// Применяем маршруты
app.use(router.routes());
app.use(router.allowedMethods());

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
