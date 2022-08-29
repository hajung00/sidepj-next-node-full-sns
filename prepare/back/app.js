const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const cors = require('cors');
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db연결 성공');
  })
  .catch(console.err);

app.use(
  cors({
    origin: '*',
  })
);
// front에서 받아온 데이터를 req.body에 넣어줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행중!');
});
