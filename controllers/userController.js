const { json } = require("express/lib/response");
const { User } = require("../models");
const FriendService = require("../services/friendService");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.getMe = async (req, res) => {
  // const {
  //   id,
  //   firstName,
  //   lastName,
  //   email,
  //   phoneNumber,
  //   profilePic,
  //   coverPhoto,
  //   createdAt,
  //   updateAt,
  // } = req.user;

  const user = JSON.parse(JSON.stringify(req.user));
  const friends = await FriendService.findAcceptedFriend(req.user.id);
  user.friends = friends;
  res.json({ user });
};

exports.updateProfile = async (req, res, next) => {
  try {
    console.log(req.file);

    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (error) {
        return next(error);
      }

      await User.update(
        { profilePic: result.secure_url },
        { where: { id: req.user.id } }
      );

      fs.unlinkSync(req.file.path);
      console.log(result.secure_url);
      res.json({ profilePic: result.secure_url });
    });

    // await User.update(
    //   { profilePic: req.file.path },
    //   { where: { id: req.user.id } }
    // );

    // res.json({ profilePic: req.file.path });
  } catch (err) {
    next(err);
  }
};
