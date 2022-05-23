"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("posts", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      title: {
        type: Sequelize.DataTypes.STRING,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      like: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      createAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      updateAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("posts");
  },
};
