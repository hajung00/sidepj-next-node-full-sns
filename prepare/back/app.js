const express = require('express');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');

const db = require('./models');
const cors = require('cors');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const hpp = require('hpp');
const helmet = require('helmet');
const path = require('path');
dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log('db연결 성공');
  })
  .catch(console.err);

passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: 'http://hajungsns.com',
      credentials: true, //cookie 전달 허용
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true, //cookie 전달 허용
    })
  );
}

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://hajungsns.com'],
    credentials: true, //cookie 전달 허용
  })
);

// front에서 받아온 데이터를 req.body에 넣어줌
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie, session 설정
// cookie: 로그인 되면 백앤드 서버에서 브라우저로 정보 전달해주는데 비밀번호 그냥 보내면 해킹에 취약해 랜덤한 문자열 생성
// session: 백앤드 user의 전체 데이터(nickname, id, email ,,,)
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnlyL: true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && '.hajungsns.com',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(80, () => {
  console.log('서버 실행중!');
});
