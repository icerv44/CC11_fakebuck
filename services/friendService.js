const { FRIEND_ACCEPTED, FRIEND_PENDING } = require("../config/constants");
const { Friend, User } = require("../models/");
const { Op } = require("sequelize");

exports.findAcceptedFriend = async (id) => {
  const friends = await Friend.findAll({
    where: {
      [Op.or]: [{ requestToId: id }, { requestFromId: id }],
      status: FRIEND_ACCEPTED,
    },
  });

  const friendIds = friends.map((el) =>
    el.requestToId === id ? el.requestFromId : el.requestToId
  );

  const users = await User.findAll({
    where: {
      id: { [Op.in]: friendIds },
    },
    attributes: { exclude: ["password"] },
  });

  return users;
};

exports.findPendingFriend = async (id) => {
  const friends = await Friend.findAll({
    where: {
      requestToId: id,
      status: FRIEND_PENDING,
    },
    include: {
      model: User,
      as: "RequestFrom",
      attributes: {
        exclude: ["password"],
      },
    },
  });

  return friends.map((el) => el.RequestFrom);
};

exports.findRequestFriend = async (id) => {
  const friends = await Friend.findAll({
    where: {
      requestFromId: id,
      status: FRIEND_PENDING,
    },
    include: {
      model: User,
      as: "RequestTo",
      attributes: {
        exclude: ["password"],
      },
    },
  });

  return friends.map((el) => el.RequestTo);
};

exports.unknowFriend = async (id) => {
  const friends = await Friend.findAll({
    where: {
      [Op.or]: [{ requestToId: id }, { requestFromId: id }],
    },
  });

  const friendIds = friends.map((el) =>
    el.requestToId === id ? el.requestFromId : el.requestToId
  );
  friendIds.push(id);

  const users = await User.findAll({
    where: {
      id: { [Op.notIn]: friendIds },
    },
    attributes: { exclude: ["password"] },
  });
  return users;
};

exports.findFriendId = async (id) => {
  const friends = await Friend.findAll({
    where: {
      [Op.or]: [{ requestToId: id }, { requestFromId: id }],
      status: FRIEND_ACCEPTED,
    },
  });

  const friendIds = friends.map((el) => {
    el.requestToId === id ? el.requestFromId : el.requestToId;
  });

  return friendIds;
};
