module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Posts",
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
    Post.belongsTo(models.Users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Post.hasMany(models.Comments, {
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Post.hasMany(models.Likes, {
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
