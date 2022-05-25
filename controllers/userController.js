const { json } = require("express/lib/response");
const { User } = require("../models");
const FriendService = require("../services/friendService");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const createError = require("../utils/createError");
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
    if (!req.files) {
      createError("profilePic or coverPhoto is required", 400);
    }
    console.log(req.file);

    const updateValue = {};

    if (req.files.profilePic) {
      const result = await cloudinary.upload(req.files.profilePic[0].path);
      if (req.user.profilePic) {
        const splited = req.user.profilePic.split("/");
        const publicId = splited[splited.length - 1].split(".")[0];
        await cloudinary.destroy(publicId);
      }
      updateValue.profilePic = result.secure_url;
    }

    // cloudinary.uploader.upload(req.file.path, async (error, result) => {
    //   if (error) {
    //     return next(error);
    //   }
    //   await User.update(
    //     { profilePic: result.secure_url },
    //     { where: { id: req.user.id } }
    //   );
    //   fs.unlinkSync(req.file.path);
    //   console.log(result.secure_url);
    //   res.json({ profilePic: result.secure_url });
    // });

    // await User.update(
    //   { profilePic: req.file.path },
    //   { where: { id: req.user.id } }
    // );

    // res.json({ profilePic: req.file.path });

    if (req.files.coverPhoto) {
      const result = await cloudinary.upload(req.files.coverPhoto[0].path);
      if (req.user.coverPhoto) {
        const splited = req.user.coverPhoto.split("/");
        const publicId = splited[splited.length - 1].split(".")[0];
        await cloudinary.destroy(publicId);
      }
      updateValue.coverPhoto = result.secure_url;
    }
    await User.update(updateValue, { where: { id: req.user.id } });
    res.json(updateValue);
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profilePic) {
      fs.unlinkSync(req.files.profilePic[0].path);
    }
    if (req.files.coverPhoto) {
      fs.unlinkSync(req.files.coverPhoto[0].path);
    }
  }
};
