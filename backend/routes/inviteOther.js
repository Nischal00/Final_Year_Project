const express = require("express");
const router = express.Router();

const EmailInviteController = require("../controller/inviteOther");

router.post("/inviteothers", EmailInviteController.postSendInvite);

module.exports = router;
