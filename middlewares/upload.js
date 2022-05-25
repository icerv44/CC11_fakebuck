const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(
    //   null,
    //   file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    // );
    cb(null, uuidv4() + "." + file.mimetype.split("/")[1]);
  },
});
//const upload = multer({ storage: storage });

module.exports = multer({ storage });
