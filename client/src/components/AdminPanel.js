import React, { useState } from "react";
import styled from "styled-components";

import { colors } from "../colors";

const AdminPanelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-basis: 32rem;
  flex: 1;
  background-color: #f5f6f8;
`;

const AvatarContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
`;

const AvatarImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
`;

const AvatarStatus = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20%;
  height: 20%;
  background-color: ${colors.green};
  z-index: 1;
  border-radius: 100%;
  border: 1px solid ${colors.messageBackgroundLight};
`;

const AdminPanelHeaderContainer = styled.div`
  display: flex;
  margin: 1rem 1.5rem;
  align-items: center;
`;

const AdminPanelContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
`;

const MessagesHorizontalLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${colors.lightestGray};
  opacity: 0.5;
  padding: 0;
  margin: 0 0 1rem 1rem;
`;

const NewUserContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 3rem;
`;

const NewUserTitle = styled.h2`
  font-size: 14pt;
  margin: 1rem;
`;


const HeaderSubtitle = styled.div`
  color: ${colors.darkGray};
  line-height: 1rem;
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const HeaderTitle = styled.div`
  color: ${colors.lightBlack};
  font-size: 1rem;
  font-weight: 700;
  margin-left: 1rem;
`;

const AdminInputText = styled.input`
  width: 100%;
  padding: 10px;
  height: 30px;
  border: none;
  margin: 1rem;
  color: ${colors.inputColor};
  &:focus {
    outline: none;
    border: none;
  }
`;

const AdminInputButton = styled.input`
  height: 50px;
  font-size: 100%;
  font: inherit;
  background: ${colors.sideBackground};
  border: 1px solid ${colors.white};
  margin: 1rem;
  width: 103%;
  &:hover {
    background: ${colors.sideBackgroundAccent};
  }
`;

const Unauthorized = styled.h2`
  font-size: 2rem;
`;

const AdminPanel = ({ newUser, messages, user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const submitNewUser = (e) => {
    e.preventDefault();
    newUser(username, password, avatar);
    setUsername("");
    setPassword("");
    setAvatar("");
  };

  return (
    <AdminPanelContainer>
      <AdminPanelHeaderContainer>
        <AvatarContainer>
          <AvatarImg src={user.avatar} />
          <AvatarStatus />
        </AvatarContainer>
        <HeaderTitle>{user.username}</HeaderTitle>
        <HeaderSubtitle>User</HeaderSubtitle>
      </AdminPanelHeaderContainer>
      <MessagesHorizontalLine />
      <AdminPanelContentContainer>
        {user.admin ? (
          <NewUserContainer onSubmit={submitNewUser}>
            <NewUserTitle>Add a new user</NewUserTitle>
            <AdminInputText
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <AdminInputText
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AdminInputText
              placeholder="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <AdminInputButton
              type="submit"
              value="Save"
              onClick={submitNewUser}
              title="Save this user"
            />
          </NewUserContainer>
        ) : (
          <Unauthorized>Unauthorized</Unauthorized>
        )}
      </AdminPanelContentContainer>
    </AdminPanelContainer>
  );
};

export default AdminPanel;
