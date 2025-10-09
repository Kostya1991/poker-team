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
 *   rate: оценка, выбранная игроком
 *  }]
 * }
 *
 * максимальное количество игроков - 24 (учесть в проверки на доступность подключения)
 */
const GAMES = [];
const SSE_CONNECTIONS = [];

/** Создание игры */
app.post('/create-game', (req, res) => {
  const gameId = randomUUID();
  const body = req.body;

  const user = {
    id: randomUUID(),
    name: body.userName,
    madeChoice: false,
    rate: undefined,
  };

  GAMES.push({ id: gameId, name: body.name, users: [user] });

  res.status(200).json({ id: gameId, user });
});

/** Проверка существования игры */
app.get('/check-game/:id', (req, res) => {
  const gameId = req.params['id'];

  const game = GAMES.find((item) => item.id === gameId);

  res.status(200).json({ game: !!game });
});

/** получение игры по идентификатору - т.е. поделючение к игре */
app.get('/game/:id', (req, res) => {
  const gameId = req.params['id'];

  const game = GAMES.find((item) => item.id === gameId);

  const userId = req.headers['user-id'];

  if (game) {
    const user = game.users.find((user) => user.id === userId);
    const message = `Пользователь ${user.name} подключился к игре!`;

    SSE_CONNECTIONS.forEach((connection) => {
      connection.write(
        `data: ${JSON.stringify({
          type: 'User-Connection',
          message,
          creatoreId: userId,
          users: game.users,
        })}\n\n`
      );
    });
  }

  res.status(200).json({ ...game });
});

// SSE
app.get('/events', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Отправляем приветственное сообщение
  res.write(
    `data: ${JSON.stringify({
      type: 'Open-Connect',
      message: 'Соединение открыто',
      creatoreId: null,
      users: [],
    })}\n\n`
  );

  /** Добавляем слушателя в массив */
  SSE_CONNECTIONS.push(res);

  // Обработка закрытия соединения
  req.on('close', () => {
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
