"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("likes", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: {
            tableName: "posts",
          },
          key: "id",
        },
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
    return queryInterface.dropTable("likes");
  },
};
