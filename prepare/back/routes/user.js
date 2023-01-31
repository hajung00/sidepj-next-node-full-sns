const express = require('express');
const { User, Post, Image, Comment } = require('../models');
const bcrypt = require('bcrypt'); //password 암호화
const passport = require('passport');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Op } = require('sequelize');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더 생성');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      // 제로초.png
      const ext = path.extname(file.originalname); //확장자 추출(pmg)
      const basename = path.basename(file.originalname, ext); //제로초
      done(null, basename + '_' + new Date().getTime() + ext); // 제로초12312434.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// GET /user
router.get('/', async (req, res, next) => {
  console.log(req.headers);
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id', 'nickname'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id', 'nickname'],
          },
        ],
      });
      console.log(fullUserWithoutPassword);
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/lists
router.get('/lists', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: ['id'],
    });
    let allUser = user.map((i) => i.id);
    const me = req.user.id;
    allUser = allUser.filter((id) => id !== me);
    const followings = await User.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'Followers',
          where: { id: req.user.id },
        },
      ],
    });
    const followList = followings.map((i) => i.id);

    const where = {
      id: {
        [Op.in]: allUser.filter((i, d) => !followList.includes(allUser[d])),
      },
    };

    const list = await User.findAll({
      where,
      limit: parseInt(req.query.lastId, 10),
      attributes: ['id', 'nickname', 'email', 'image'],
    });
    console.log(list);
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user/images
router.post('/images', upload.array('image'), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((y) => y.filename));
});

// GET /user/followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
  console.log('didid0', req.query.followersLimit);
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 회원입니다.');
    }
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followings
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    console.log('req', req.params.followingsLimit);
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 회원입니다.');
    }
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  // GET /user/1
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followings',
          attributes: ['id', 'image'],
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id', 'image'],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      data.Image = data.image;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자 입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }

    // passport login
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword); // cookie,사용자 정보 front 서버로 전송
    });
  })(req, res, next);
});

// 회원가입
router.post(
  '/',
  upload.none(),
  isNotLoggedIn,

  async (req, res, next) => {
    console.log('req.body', req.body);
    try {
      const exUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (exUser) {
        return res.status(403).send('이미 사용중인 아이디입니다.');
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      await User.create({
        email: req.body.email,
        nickname: req.body.nickname,
        password: hashedPassword,
        image: req.body.image,
      });
      res.status(200).send('ok');
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// POST /logout
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

// PATCH /user/profile
router.patch('/profile', upload.none(), isLoggedIn, async (req, res, next) => {
  console.log(req.body.image);
  try {
    await User.update(
      {
        nickname: req.body.nickname,
        image: req.body.image,
      },
      {
        where: { id: req.user.id },
      }
    );
    res
      .status(200)
      .json({ nickname: req.body.nickname, image: req.body.image });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /user/1/follow
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      attributes: ['id', 'nickname', 'image'],
    });
    console.log(user);
    if (!user) {
      res.status(403).send('존재하지 않는 회원입니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/1/follow
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 회원입니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/follower/1
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 회원을 차단하려고 하시네요.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/1/posts
router.get('/:userId/posts', async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'image'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'image'],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'image'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
