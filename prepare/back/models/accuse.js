module.exports = (sequelize, DataTypes) => {
  const Accuse = sequelize.define(
    'Accuse',
    {
      content: { type: DataTypes.STRING(200) },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글 저장
    }
  );
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  Accuse.associate = (db) => {
    // define association here
    db.Accuse.belongsTo(db.User);
    db.Accuse.belongsTo(db.Post);
  };
  return Accuse;
};
