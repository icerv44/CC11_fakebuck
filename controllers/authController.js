const createError = require("../utils/createError");
//const updateError = require("../utils/updateError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { User } = require("../models");
const { Op } = require("sequelize");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = async (req, res, next) => {
  try {
    const { emailOrPhone, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      },
    });

    if (!user) {
      createError("invalid credential", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      createError("invalid credential", 400);
    }

    const token = genToken({ id: user.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    // const body = req.body;
    const { firstName, lastName, emailOrPhone, password, confirmPassword } =
      req.body;
    console.log(req.body);
    if (!emailOrPhone) {
      createError("emailOrPhone is required", 400);
    }

    if (!password) {
      createError("password is required", 400);
    }

    if (password !== confirmPassword) {
      createError("password isn't match with confirm password", 400);
    }

    const isPhone = validator.isMobilePhone(emailOrPhone + "");
    const isEmail = validator.isEmail(emailOrPhone + "");

    if (!isEmail && !isPhone) {
      createError("Email or phone number is invalid format", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    // if (password.length < 6) {
    //   createError("password must be at least 6 charactor", 400);
    // }

    // if (password !== confirmPassword) {
    //   createError("Password did not match", 400);
    //   // return res.status(400).json({message:'password not match'})
    // }

    //create new user
    const user = await User.create({
      firstName,
      lastName,
      email: isEmail ? emailOrPhone : null,
      phoneNumber: isPhone ? emailOrPhone : null,
      password: hashedPassword,
    });
    console.log(user);

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

// exports.login = async (req, res, next) => {
//     try {
//       // const body = req.body;
//       const { username, password } = req.body;
//       console.log(username + "    " + password);

//       if (!username) {
//         createError("username is required", 400);
//       }

//       if (!password) {
//         createError("password is required", 400);
//       }

//       const DBPassword = await User.findOne({ where: { username: username } });
//       console.log(DBPassword);
//       const isPasswordMatch = await bcrypt.compare(password, DBPassword.password);
//       if (!isPasswordMatch) {
//         createError("invalid username or password", 400);
//       }

//       const payLoad = {
//         id: DBPassword.id,
//         username: username,
//         email: DBPassword.email,
//       };
//       const secrtKey = process.env.JWT_SECRET_KEY || "abcde";

//       const token = jwt.sign(payLoad, secrtKey, {
//         algorithm: "HS256",
//         expiresIn: "30d",
//       });

//       console.log("Token" + token);

//       if (isPasswordMatch) {
//         const user = await User.findOne({ where: { username: username } });
//         console.log(JSON.parse(JSON.stringify(user)));
//         res.status(201).json({ message: "login success   ", token: token });
//       }
//     } catch (err) {
//       next(err);
//     }
//   };

// exports.updateUser = async (req, res, next) => {
//   try {
//     // const { id, username, email, password, confirmPassword } = req.body;
//     // if (password !== confirmPassword) {
//     //   updateError("Password did not match", 400);
//     // }

//     // await User.update(
//     //   { id, username, email, password, confirmPassword },
//     //   {
//     //     where: {
//     //       id: id,
//     //     },
//     //   }
//     // );
//     const {
//       username,
//       email,
//       birthDate,
//       oldPassword,
//       newPassword,
//       confirmNewPassword,
//     } = req.body;

//     const isCorrectPassword = await bcrypt.compare(
//       oldPassword,
//       req.user.password
//     );

//     if (!isCorrectPassword) {
//       createError("invalid password", 400);
//     }
//     if (oldPassword === newPassword) {
//       createError("Password is same the old", 400);
//     }

//     if (newPassword !== confirmNewPassword) {
//       createError("password did not match", 400);
//     }

//     // const user = await User.findOne({ where: { username } });
//     // if (!user) {
//     //   createError("incorrect Username", 400);
//     // }
//     const value = { email, birthDate };

//     if (newPassword) {
//       const hashedPassword = await bcrypt.hash(newPassword, 12);
//       value.lastUpdatePassword = new Date();
//       value.password = hashedPassword;
//     }

//     await User.update(value, { where: { id: req.user.id } });

//     res.status(202).json({ message: "Update success" });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getUser = (req, res) => {
//   res.json({ user: req.user });
// };
