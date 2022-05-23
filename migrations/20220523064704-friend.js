"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("friends", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      requestfrom_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      requestto_id: {
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
    return queryInterface.dropTable("friends");
  },
};
