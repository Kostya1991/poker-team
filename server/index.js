const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

/**
 * Структура игры: {
 *  id: идентификатор игры
 *  name: наименование игры
 *  users: [{
 *   id: идентификатор игрока,
 *   name: Имя игрока
 *   madeChoice: Сделал ли игрок выбор
 *  }]
 * }
 *
 * максимальное количество игроков - 24 (учесть в проверки на доступность подключения)
 */
const GAMES = [];

app.post('/create-game', (req, res) => {
  const gameId = randomUUID();
  const body = req.body;

  const user = {
    id: randomUUID(),
    name: body.userName,
    madeChoice: false,
  };

  GAMES.push({ id: gameId, name: body.name, users: [user] });

  res.status(200).json({ id: gameId, user });
});

app.get('/check-game/:id', (req, res) => {
  const gameId = req.params['id'];

  const game = GAMES.find((item) => item.id === gameId);

  res.status(200).json({ game: !!game });
});

app.get('/game/:id', (req, res) => {
  const gameId = req.params['id'];

  const game = GAMES.find((item) => item.id === gameId);

  res.status(200).json({ game });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
