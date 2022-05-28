const { Op } = require("sequelize");
const createError = require("../utils/createError");
const { Friend } = require("../models");
const { FRIEND_ACCEPTED, FRIEND_PENDING } = require("../config/constants");
const req = require("express/lib/request");
const user = require("../models/user");
const FriendService = require("../services/friendService");

exports.getAllFriend = async (req, res, next) => {
  try {
    const { status } = req.query;
    let users = [];
    if (status?.toUpperCase() === "UNKNOWN") {
      // **** FIND UNKNOWN
      users = await FriendService.findUnknown(req.user.id);
    } else if (status?.toUpperCase() === "PENDING") {
      // **** FIND PENDING FRIEND
      users = await FriendService.findPendingFriend(req.user.id);
      //console.log("findPendingFriend");
    } else if (status?.toUpperCase() === "REQUESTED") {
      // *** FIND REQUESTED FRIEND
      users = await FriendService.findRequestFriend(req.user.id);
    } else {
      // *** FIND ACCEPTED FRIEND
      users = await FriendService.findAcceptedFriend(req.user.id);
    }
    // const friends = await Friend.findAll({
    //   where: {
    //     [Op.or]: [{ requestToId: req.user.id }, { requestFromId: req.user.id }],
    //     status: FRIEND_ACCEPTED,
    //   },
    // });

    // const friendsId = friends.map((el) =>
    //   el.requestToId === req.user.id ? el.requestFromId : el.requestToId
    // );
    // // select * from users where id in ()
    // const users = await user.findAll({
    //   where: { id: friendsId },
    //   attribute: { exclude: ["password"] },
    // });

    // Find accepted friend
    //const users = await FriendService.findAcceptedFriend(req.user.id);

    //Find pending user
    //const users = await FriendService.findPenddingFriend(req.user.id);

    // Find Request Friend
    //const users = await FriendService.findRequestFriend(req.user.id);

    // Find unknow Friend
    // const users = await FriendService.unknowFriend(req.user.id);

    res.json({ users });
  } catch (err) {
    next(err);
  }
};

exports.requestFriend = async (req, res, next) => {
  try {
    const { requestToId } = req.body;

    if (req.user.id === +requestToId) {
      createError("cannot request yourself", 400);
    }

    const existFriend = await Friend.findOne({
      where: {
        [Op.or]: [
          { requestFromId: req.user.id, requestToId: requestToId },
          { requestFromId: requestToId, requestToId: req.user.id },
        ],
      },
    });

    if (existFriend) {
      createError("this user has already been requested", 400);
    }

    const friend = await Friend.create({
      requestToId,
      requestFromId: req.user.id,
      status: FRIEND_PENDING,
    });
    res.json({ friend });
  } catch (err) {
    next(err);
  }
};

exports.updateFriend = async (req, res, next) => {
  try {
    const { requestFromId } = req.query;
    console.log("friend:  " + requestFromId);
    const friend = await Friend.findOne({
      where: {
        requestFromId,
        requestToId: req.user.id,
        status: FRIEND_PENDING,
      },
    });
    console.log("friend:  " + friend);

    if (!friend) {
      createError("friend request not found", 400);
    }

    friend.status = FRIEND_ACCEPTED;
    await friend.save();
    // await Friend.update({ status: FRIEND_ACCEPTED }, { where: { id: friend.id } })
    res.json({ message: "friend request accepted" });
  } catch (err) {
    next(err);
  }
};

exports.deleteFriend = async (req, res, next) => {
  try {
    const { id } = req.params;

    const friend = await Friend.findOne({ where: { id } });

    if (!friend) {
      createError("friend request not found", 400);
    }

    if (
      friend.requestFromId !== req.user.id &&
      friend.requestToId !== req.user.id
    ) {
      createError("you have no permission", 403);
    }

    await friend.destroy();
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
