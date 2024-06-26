const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { Post, Image, Comment, User, Hashtag, Accuse } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더 생성');
  fs.mkdirSync('uploads');
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'hajungsns',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

//POST /post
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      ); //[[노드,true],[리액트,true]]
      await post.addHashtags(result.map((y) => y[0]));
    }

    if (req.body.image) {
      // 이미지 여러개 올리면 image:[image1.png, image2.png]
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      }
      // 이미지 하나만 올리면 image: image1.png
      else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
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
          model: User,
          attributes: ['id', 'nickname', 'image'],
        },
        {
          model: User,
          as: 'Likers',
          attributese: ['id'],
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET /post/1
router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
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
        {
          model: User,
          attributes: ['id', 'nickname', 'image'],
        },
        {
          model: User,
          as: 'Likers',
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
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//Post /post/id/retweet
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
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
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//Post /post/id/comment
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  console.log(req.body);
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'image'],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /post/images
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((y) => y.location.replace(/\/original\//, '/thumb/')));
});

// // POST /post/accuse
router.post('/accuse', isLoggedIn, async (req, res, next) => {
  console.log(req.body);
  try {
    const post = await Post.findOne({
      where: { id: req.body.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const accusePost = await Accuse.findOne({
      where: {
        UserId: req.user.id,
        PostId: req.body.postId,
      },
    });
    if (accusePost) {
      return res.status(403).send('이미 신고한 게시글입니다.');
    }

    const user = await User.findOne({
      where: { id: req.user.id },
    });
    const accuse = await Accuse.findAll({
      where: {
        PostId: req.body.postId,
      },
    });
    console.log(accuse.length);
    if (accuse.length >= 2) {
      await Accuse.create({
        PostId: req.body.postId,
        UserId: req.user.id,
        content: `content: ${req.body.content}  userId: ${post.UserId}`,
      });
      await Post.destroy({
        where: { id: req.body.postId },
      });
      return res.status(200).send({ PostId: req.body.postId });
    } else {
      await Accuse.create({
        PostId: req.body.postId,
        UserId: req.user.id,
      });
      res.status(200).send({
        PostId: req.body.postId,
        UserId: req.user.id,
        Nickname: user.nickname,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//PATCH /post/1/like
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/1/like
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/10
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/10/comment
router.delete('/:commentId/comment', isLoggedIn, async (req, res, next) => {
  console.log(req.params.commentId);
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId },
    });
    if (!comment) {
      return res.status(403).send('댓글이 존재하지 않습니다.');
    }
    await Comment.destroy({
      where: {
        UserId: req.user.id,
        id: req.params.commentId,
      },
    });
    res.status(200).json({
      commentId: parseInt(req.params.commentId, 10),
      PostId: parseInt(comment.PostId),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// patch /post/10/
router.patch('/:postId', isLoggedIn, async (req, res, next) => {
  console.log(req.body.content);
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('해당 게시글이 존재하지 않습니다.');
    }
    await Post.update(
      {
        content: req.body.content,
      },
      {
        where: {
          UserId: req.user.id,
          id: req.params.postId,
        },
      }
    );
    res.status(200).json({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
