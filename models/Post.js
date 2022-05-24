module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      //   id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     autoIncrement: true,
      //     primaryKey: true,
      //   },
      //   user_id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     reference: {
      //       model: {
      //         tableName: "users",
      //       },
      //       key: "id",
      //     },
      //   },
      title: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      like: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        // validate: {
        //     notEmpty: false,
        // },
      },
      //   createAt: {
      //     type: DataTypes.DATE,
      //     allowNull: false,
      //     validate: {
      //       notEmpty: false,
      //     },
      //   },
      //   updateAt: {
      //     type: DataTypes.DATE,
      //     allowNull: false,
      //     validate: {
      //       notEmpty: false,
      //     },
      //   },
    },
    {
      underscored: true,
      // , paranoid: true
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Post.hasMany(models.Comment, {
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Post.hasMany(models.Like, {
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Post;
};
