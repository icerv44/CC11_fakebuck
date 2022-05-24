module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {},
    {
      underscored: true,
      // , paranoid: true
    }
  );
  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Like.belongsTo(models.Post, {
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
