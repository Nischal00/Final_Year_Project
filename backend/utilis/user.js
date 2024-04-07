const users = [];
const rooms = [];

const addUser = ({ id, name, room }) => {
  var creator;
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const roomSize = users.filter((user) => user.room === room);

  let roomVal;
  if (roomSize.length === 0) {
    roomVal = {
      roomid: room,
      creator: name,
    };
  } else {
    roomVal = rooms.filter((r) => r.roomid === room)[0];
  }

  creator = roomVal.creator;
  const user = { id, name, room, creator };
  const existingRoom = rooms.find((r) => r.roomid === room);
  if (!existingRoom) {
    rooms.push(roomVal);
  }
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (!existingUser) {
    users.push(user);
  }

  console.log(users);

  console.log(rooms);
  return { user };
};

const checkExistingUser = (room, name) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) return true;
  return false;
};

const removeUser = (id) => {
  console.log("remove");
  const index = users.findIndex((user) => user.id === id);
  let room;
  let usersList;
  if (index !== -1) {
    room = users[index].room;
    usersList = users.splice(index, 1)[0];
    let roomSize = users.filter((user) => user.room === room);
    if (roomSize.length === 0) {
      let rindex = rooms.findIndex((r) => r.roomid === room);
      rooms.splice(rindex, 1)[0];
    }
  }

  console.log(users);
  console.log(rooms);
  return usersList;
};

const getUser = (id) => users.find((user) => user.id === id);

const getAllUsers = () => {
  console.log(users);
  return users;
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const checkLimitInRoomExceed = (room) => {
  const roomSize = users.filter((user) => user.room === room);
  if (roomSize.length > 4) return true;
  return false;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getAllUsers,
  checkExistingUser,
  checkLimitInRoomExceed,
};
