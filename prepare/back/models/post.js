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
    db.Post.belongsTo(db.User); //post.addUser
    db.Post.hasMany(db.Comment); //post.addComments
    db.Post.hasMany(db.Accuse);
    db.Post.hasMany(db.Image); //post.addImages
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); //post.addHashtags
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); //post.addLikers, post,removeLikers
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
  };
  return Post;
};
