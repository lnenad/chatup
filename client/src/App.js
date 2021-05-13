import moment from "moment";
import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import SideNav from "./components/SideNav";
import MessagesPanel from "./components/UsersMessagesPanel";
import MessagePanel from "./components/MessagePanel";
import LoginPanel from "./components/LoginPanel";
import auth from "./utilities/auth";
import AdminPanel from "./components/AdminPanel";
import UsersPanel from "./components/UsersPanel";
import { Send, Heart, Smile } from "react-feather";
import { useSnackbar } from "notistack";
import { colors } from "./colors";
import playNotification from "./utilities/sound";
import { EmojiButton } from "@joeattardi/emoji-button";

const { newClientType, newMessageType } = require("./mesageTypes");

const host = process.env.REACT_APP_CHATUP_HOST;
const ws = new WebSocket(`wss://${host}`);
const api = `https://${host}`;

const parseResponse = (r) => {
  return new Promise((res, rej) => {
    if (r.status > 299) {
      return rej(r.json());
    }
    return res(r.json());
  });
};

const handleError = async (enqueueSnackbar, setIsLoggedIn, err) => {
  const r = await err;
  console.error(r);
  enqueueSnackbar(r.error ? r.error : r.toString(), {
    variant: "error",
  });
  if (
    r.error &&
    (r.error == "Unauthorized" || r.error.includes("Failed to fetch"))
  ) {
    setIsLoggedIn(false);
    auth.removeToken();
  }
};

const FullScreenAppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const MessageInputContainer = styled.form`
  display: flex;
  align-items: center;
  background-color: ${colors.messageInputBackground};
  padding: 1.5rem;
`;
const MessageInputText = styled.input`
  width: 100%;
  padding: 10px;
  height: 30px;
  border: none;
  margin-left: 1rem;
  margin-right: 1rem;
  color: ${colors.inputColor};
  &:focus {
    outline: none;
    border: none;
    box-shadow: 0px 0px 2px ${colors.messageBackgroundLightUser};
  }
`;
const MessagePanelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-basis: 32rem;
  flex: 1;
  background-color: #f5f6f8;
`;

let activeTimeout = null;
let activeWindow = true;
let activeTimeoutTime = 30000;

const inactive = () => {
  activeWindow = false;
}

const resetTimer = () => {
  activeWindow = true;
  clearTimeout(activeTimeout);
  activeTimeout = setTimeout(inactive, activeTimeoutTime)
};
activeTimeout = setTimeout(inactive, activeTimeoutTime)

document.addEventListener("mousemove", resetTimer, false);
document.addEventListener("mousedown", resetTimer, false);
document.addEventListener("keypress", resetTimer, false);
document.addEventListener("touchmove", resetTimer, false);

const App = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [page, setLocalPage] = useState(localStorage.getItem("page") || "chat");
  const [reloadUserData, setReloadUserData] = useState(false);
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isUserLoggedIn());
  const [messageValue, setMessageValue] = useState("");
  const [picker] = useState(
    new EmojiButton({
      autoHide: false,
    })
  );
  const textInputRef = useRef(null);

  ws.onmessage = useCallback((event) => {
    console.log(event);
    const payload = JSON.parse(event.data);
    switch (payload.type) {
      case newClientType:
        console.log("New Client:", payload.data);
        setReloadUserData(!reloadUserData);
        break;
      case newMessageType:
        console.log("New Message:", payload.data, user);

        if (payload.data.userID != user.userID && (document.hidden || !activeWindow)) {
          playNotification();
        }

        const message = {
          ...payload.data,
          avatar: users.find((u) => {
            return u.userID === payload.data.userID;
          }).avatar,
        };
        setMessages([...messages, message]);
        break;
    }
  });

  const newMessage = useCallback((message) => {
    ws.send(
      JSON.stringify({
        type: newMessageType,
        data: {
          userID: user.userID,
          username: user.username,
          content: message,
          date: moment(),
        },
      })
    );
  });

  const setPage = useCallback((page) => {
    localStorage.setItem("page", page);
    setLocalPage(page);
  });

  const loginUser = useCallback((username, password) => {
    fetch(`${api}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(parseResponse)
      .then((r) => {
        enqueueSnackbar("Successful login!");
        auth.setToken(r.token);
        setIsLoggedIn(true);
        setUser(r.user);
      })
      .catch(handleError.bind(null, enqueueSnackbar, setIsLoggedIn));
  });

  const deleteUser = useCallback((id) => {
    fetch(`${api}/users/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        "content-type": "application/json",
      },
    })
      .then(parseResponse)
      .then(() => {
        enqueueSnackbar("User removed successfully!");
        setReloadUserData(!reloadUserData);
      })
      .catch(handleError.bind(null, enqueueSnackbar, setIsLoggedIn));
  });

  const newUser = useCallback((username, password, avatar) => {
    const data = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        avatar,
      }),
    };
    fetch(`${api}/users`, data)
      .then(parseResponse)
      .then((r) => {
        enqueueSnackbar("A new user has been added!");
        setReloadUserData(!reloadUserData);
      })
      .catch(handleError.bind(null, enqueueSnackbar, setIsLoggedIn));
  });

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const data = {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    };
    fetch(`${api}/user`, data)
      .then(parseResponse)
      .then((r) => {
        setUser(r.user);
        return fetch(`${api}/users`, data);
      })
      .then(parseResponse)
      .then((r) => {
        setUsers(r);
        setUsersMap(
          r.reduce((acc, u) => {
            acc[u.userID] = u;
            return acc;
          }, {})
        );
      })
      .catch(handleError.bind(null, enqueueSnackbar, setIsLoggedIn));
  }, [isLoggedIn, reloadUserData]);

  useEffect(() => {
    if (users.length === 0) {
      return;
    }
    const data = {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    };
    fetch(`${api}/messages`, data)
      .then(parseResponse)
      .then((r) => {
        setMessages(
          r.map((m) => {
            if (!m.avatar && usersMap[m.userID]) {
              m.avatar = usersMap[m.userID].avatar;
            }
            return m;
          })
        );
      })
      .catch(handleError.bind(null, enqueueSnackbar, setIsLoggedIn));
  }, [usersMap]);

  useEffect(() => {
    console.log("INVOKED");

    picker.on("emoji", (selection) => {
      // handle the selected emoji here
      console.log(selection.emoji);
      console.log(textInputRef);
      const input = textInputRef.current;
      const startPos = input.selectionStart;
      const endPos = input.selectionEnd;
      setMessageValue(
        input.value.substring(0, startPos) +
          selection.emoji +
          input.value.substring(endPos, input.value.length)
      );
    });
  }, [textInputRef]);

  if (!isLoggedIn) {
    return (
      <FullScreenAppContainer>
        <LoginPanel loginUser={loginUser} />
      </FullScreenAppContainer>
    );
  }

  const submitMessage = (e) => {
    e.preventDefault();
    if (!messageValue) {
      return;
    }

    newMessage(messageValue);
    setMessageValue("");
  };

  const addHeart = () => {
    const input = textInputRef.current;
    const startPos = input.selectionStart;
    const endPos = input.selectionEnd;
    setMessageValue(
      input.value.substring(0, startPos) +
        `❤️` +
        input.value.substring(endPos, input.value.length)
    );
  };

  switch (page) {
    case "chat":
      return (
        <FullScreenAppContainer>
          <SideNav user={user} page={page} setPage={setPage} />
          <MessagesPanel users={users} user={user} />
          <MessagePanelContainer>
            <MessagePanel
              messages={messages}
              newMessage={newMessage}
              user={user}
            />
            <MessageInputContainer onSubmit={submitMessage}>
              <MessageInputText
                ref={textInputRef}
                value={messageValue}
                onChange={(e) => {
                  e.preventDefault();
                  setMessageValue(e.target.value);
                }}
                placeholder="Write text here"
              />
              <Heart
                color={colors.lightBlack}
                onClick={addHeart}
                style={{ marginRight: "9px" }}
              />
              <Smile
                onClick={() => picker.togglePicker(textInputRef.current)}
                style={{ marginRight: "9px" }}
              />
              <Send color={colors.lightBlack} onClick={submitMessage} />
            </MessageInputContainer>
          </MessagePanelContainer>
        </FullScreenAppContainer>
      );
    case "admin":
      return (
        <FullScreenAppContainer>
          <SideNav user={user} page={page} setPage={setPage} />
          <UsersPanel deleteUser={deleteUser} users={users} user={user} />
          <AdminPanel
            newUser={newUser}
            messages={messages}
            newMessage={newMessage}
            user={user}
          />
        </FullScreenAppContainer>
      );
  }
};

export default App;
