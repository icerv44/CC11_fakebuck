module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comments",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
      // , paranoid: true
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.Users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Comment.belongsTo(models.Posts, {
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Comment;
};
