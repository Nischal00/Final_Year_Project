const express = require("express");
const router = express.Router();

const RoomController = require("../controller/room");

router.post("/rooms/checklimit", RoomController.checkLimitInRoomExceed);

router.post("/rooms/checkuser", RoomController.checkExistingUser);

module.exports = router;
