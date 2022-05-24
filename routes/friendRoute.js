const express = require("express");
const friendController = require("../controllers/friendController");

const router = express.Router();

router.get("/", friendController.getAllFriend);
router.post("/", friendController.requestFriend);
router.patch("/", friendController.updateFriend);
router.delete("/:id", friendController.deleteFriend);

module.exports = router;
