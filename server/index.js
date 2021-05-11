const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 4000;

const { Server } = require("ws");
const { getPasswordHash, getHash } = require("./utilities/auth");

const {
  loginHandler,
  usersPOSTHandler,
  userGETHandler,
  usersGETHandler,
  userDELETEHandler,
  messagesGETHandler,
  authMiddleware,
  newWSMessageHandler,
} = require("./handlers");

const users = [];
const messages = []; //require("./a-lot-of-messages");

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD env variables must be set to run the application');
}

(async () => {
  users.push(
    {
      userID: getHash(process.env.ADMIN_USERNAME),
      avatar:
        "",
      username: process.env.ADMIN_USERNAME,
      admin: true,
      password: await getPasswordHash(process.env.ADMIN_PASSWORD),
    }
  );
})();

const server = express()
  .use(cors())
  .use(express.json())
  .post("/login", loginHandler(users))
  .use(authMiddleware)
  .get("/messages", messagesGETHandler(messages))
  .post("/users", usersPOSTHandler(users))
  .get("/users", usersGETHandler(users))
  .delete("/users/:id", userDELETEHandler(users))
  .get("/user", userGETHandler)
  .listen(port, () => console.log(`Listening on ${port}`));

const wss = new Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", newWSMessageHandler(wss, messages));
  ws.on("close", () => console.log("Client disconnected"));
});
