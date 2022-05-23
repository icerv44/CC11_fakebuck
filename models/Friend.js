module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    "Friends",
    {
      status: {
        type: DataTypes.ENUM("ACCEPTED", "PENDING"),
        allowNull: false,
        defaultValue: "PENDING",
      },
    },
    {
      underscored: true,
      // , paranoid: true
    }
  );

  Friend.associate = (models) => {
    Friend.belongsTo(models.Users, {
      foreignKey: {
        name: "RequestFrom",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Friend.belongsTo(models.Users, {
      foreignKey: {
        name: "RequestTo",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Friend;
};
