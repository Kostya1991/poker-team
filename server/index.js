const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

/**
 * Структура игры: {
 *  id: идентификатор игры
 *  users: [{
 *   id: идентификатор игрока,
 *   name: Имя игрока
 *  }]
 * }
 */
const GAMES = [];

app.get('/create-game', (req, res) => {
  const gameId = uuid();

  GAMES.push({ id: gameId, users: [] });

  res.status(200).json({ id: gameId });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
