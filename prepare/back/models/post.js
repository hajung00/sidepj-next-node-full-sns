module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      // id가 기본적으로 들어있음.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    //  UserId
    //  RetweetId
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
  };
  return Post;
};
