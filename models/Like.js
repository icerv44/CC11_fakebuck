module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Likes",
    {},
    {
      underscored: true,
      // , paranoid: true
    }
  );
  Like.associate = (models) => {
    Like.belongsTo(models.Users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Like.belongsTo(models.Posts, {
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Like;
};
