const { checkExistingUser, checkLimitInRoomExceed } = require("../utilis/user");

exports.checkLimitInRoomExceed = (req, res, next) => {
  var roomId = req.body.roomId;
  const result = checkLimitInRoomExceed(roomId);
  res.send(result);
};

exports.checkExistingUser = (req, res, next) => {
  var roomId = req.body.roomId;
  var name = req.body.username;
  console.log(req.body);
  const result = checkExistingUser(roomId, name);
  console.log(result);
  res.send(result);
};
