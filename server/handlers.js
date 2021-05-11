const jwt = require("jsonwebtoken");
const {
  getPasswordHash,
  getHash,
  verifyPassword,
} = require("./utilities/auth");

const { newClientType, newMessageType } = require("./mesageTypes");

const secret = process.env.SECRET || Math.random().toString();

const invalidLogin = (res) =>
  res.status(401).json({ error: "Invalid login information" });

const unauthorized = (res) => res.status(403).json({ error: "Unauthorized" });

const loginHandler = (users) => async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    console.log(u.username, username);
    return u.username === username;
  });

  console.log(users, user, username, password);

  if (!user || !username || !password) {
    return invalidLogin(res);
  }

  if (!(await verifyPassword(password, user.password))) {
    return invalidLogin(res);
  }

  res.json({
    token: jwt.sign(
      {
        username,
        userID: getHash(username),
        avatar: user.avatar,
        admin: user.admin,
      },
      secret,
      { expiresIn: "1h" }
    ),
    user: {
      userID: user.userID,
      username: user.username,
      avatar: user.avatar,
      admin: false,
    },
  });
};

const usersPOSTHandler = (users) => async (req, res) => {
  const { username, password } = req.body;

  users.push({
    username,
    userID: getHash(username),
    admin: false,
    avatar:
      "https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.6435-9/38055911_10214975711220127_7170563413817425920_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=T2Ee2Y_aV3QAX_awjWI&_nc_ht=scontent.fbeg2-1.fna&oh=8007f6dc2c7d4ca1fec1f036dc4efb8c&oe=60A02466",
    password: await getPasswordHash(password),
  });
  res.json({
    success: true,
  });
};

const usersGETHandler = (users) => (req, res) => {
  res.send(
    users.map((u) => ({
      username: u.username,
      userID: u.userID,
      avatar: u.avatar,
    }))
  );
};

const messagesGETHandler = (messages) => (req, res) => {
  res.send(messages);
};

const userGETHandler = (req, res) => {
  res.send({
    user: req.user,
  });
};

const userDELETEHandler = (users) => (req, res) => {
  if (!req.user.admin) {
    return unauthorized(res);
  }

  const id = req.params.id;
  const index = users.findIndex((u) => u.userID == id);
  if (index === -1) {
    res.send({
      error: "No user found with given id",
    });
  }
  users.splice(index, 1);

  res.send({
    success: true,
  });
};

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return unauthorized(res);
    }
    const user = jwt.verify(token.substr(7), secret);
    req.user = user;
    return next();
  } catch (err) {
    unauthorized(res);
  }
};

const newWSMessageHandler = (wss, messages) => (message) => {
  console.log("Message", message);
  const payload = JSON.parse(message);
  switch (payload.type) {
    case newClientType:
      console.log("New client signup");
      break;
    case newMessageType:
      console.log("New message parsed");
      messages.push(payload.data);
      break;
  }
  wss.clients.forEach((client) => {
    client.send(message);
  });
};

module.exports = {
  loginHandler,
  usersPOSTHandler,
  usersGETHandler,
  userGETHandler,
  userDELETEHandler,
  newWSMessageHandler,
  messagesGETHandler,
  authMiddleware,
};
