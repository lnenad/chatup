import React, { Fragment } from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { XSquare, Search } from 'react-feather';

const UsersPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-basis: 28rem;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 4px 0 10px 4px rgba(126, 122, 122, 0.16);
  z-index: 1;
`;

const UsersPanelTitle = styled.h1`
  font-size: 1.5rem;
  color: ${colors.lightBlack};
  margin: 2rem 1rem 2rem 2rem;
`;

const UsersSearch = styled.div`
  color: ${colors.lightestGray};
  font-size: 1rem;
  margin: 0 0 1rem 2rem;
  opacity: 0.5;
`;

const UsersHorizontalLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${colors.lightestGray};
  opacity: 0.5;
  padding: 0;
  margin: 0 0 0 2rem;
  width: 85%;
`;

const UsersContainer = styled.div`
  margin-top: 10px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: ${props => (props.active ? colors.offwhite : null)};
  &:hover {
    background-color: ${colors.offwhite};
  }
`;

const AvatarContainer = styled.div`
  width: 4rem;
  height: 4rem;
  position: relative;
`;

const AvatarImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
`;

const UsersContentContainer = styled.div`
  flex: 1;
`;

const UsersContentHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 4rem;
  margin-left: 1.5rem;
  margin-bottom: 0.25rem;
`;

const UsersContentTitle = styled.div`
  color: ${colors.lightBlack};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
`;

const UsersContentSubtitle = styled.div`
  color: ${colors.lightestGray};
  font-size: 1rem;
`;

const UsersActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 4rem;
  margin-right: 2rem;
`;

const DeleteAction = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${colors.red};
  &:hover {
    color: ${colors.lightBlack};
  }
`;

const UsersPanel = ({ users, user, deleteUser }) => (
  <UsersPanelContainer>
    <UsersPanelTitle>Users</UsersPanelTitle>
    <UsersSearch>
      <Search size={20} />
    </UsersSearch>
    <UsersHorizontalLine />
    <UsersContainer>
      {users.map((u, idx) => {
        if (user.userID === u.userID) {
          return <Fragment key={idx}></Fragment>;
        }
        return (
          <UserContainer key={idx}>
            <AvatarContainer>
              <AvatarImg src={u.avatar} />
            </AvatarContainer>
            <UsersContentContainer>
              <UsersContentHeaderContainer>
                <UsersContentTitle>{u.username}</UsersContentTitle>
                <UsersContentSubtitle>User</UsersContentSubtitle>
              </UsersContentHeaderContainer>
            </UsersContentContainer>
            <UsersActionsContainer>
              <DeleteAction title="Delete this user">
                <XSquare onClick={deleteUser.bind(null, u.userID)} size={20} />
              </DeleteAction>
            </UsersActionsContainer>
          </UserContainer>
        );
      })}
    </UsersContainer>
  </UsersPanelContainer>
);

export default UsersPanel;
