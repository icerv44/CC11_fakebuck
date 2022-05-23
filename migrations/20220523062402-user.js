"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 100],
        },
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      profilePic: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      coverPhoto: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return queryInterface.dropTable("users");
  },
};
