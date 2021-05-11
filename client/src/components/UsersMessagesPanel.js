import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { colors } from "../colors";
import { EyeOff, Search } from "react-feather";

const MessagesPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-basis: ${(props) => (props.visible ? "28rem" : "5rem")};
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 4px 0 10px 4px rgba(126, 122, 122, 0.16);
  z-index: 1;
  min-width: ${(props) => (props.visible ? "220px" : "0")};
`;

const MessagesPanelTitle = styled.div`
  font-size: 1.5rem;
  color: ${colors.lightBlack};
  margin: 2rem 1rem 2rem 2rem;
  display: flex;
  justify-content: space-between;
`;

const MessagesSearch = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  color: ${colors.lightestGray};
  font-size: 1rem;
  margin: 0 0 1rem 2rem;
  opacity: 0.5;
`;

const MessagesHorizontalLine = styled.hr`
  display: ${(props) => (props.visible ? "block" : "none")};
  height: 1px;
  border: 0;
  border-top: 1px solid ${colors.lightestGray};
  opacity: 0.5;
  padding: 0;
  margin: 0 0 0 2rem;
  width: 85%;
`;

const MessagesContainer = styled.div`
  margin-top: 10px;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: ${(props) => (props.active ? colors.offwhite : null)};
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

const MessageContentContainer = styled.div`
  flex: 1;
`;

const MessageContentHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 4rem;
  margin-left: 1.5rem;
  margin-bottom: 0.25rem;
`;

const MessageContentTitle = styled.div`
  color: ${colors.lightBlack};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
`;

const MessageContentSubtitle = styled.div`
  color: ${colors.lightestGray};
  font-size: 1rem;
`;

const MessageNotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 4rem;
  margin-right: 2rem;
`;

const MessageNotifications = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.red};
  color: ${colors.messageBackgroundLight};
`;

//todo, work on this, sloppy right now
const MessagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 3rem;
  width: 100%;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 1.5rem;
  line-height: 1.5rem;
  color: ${colors.lightBlack};
  opacity: 0.7;
`;

const MessageDivider = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${colors.lightestGray};
  opacity: 0.5;
  padding: 0;
  margin: 0rem 0 0rem 7rem;
`;

const HideMessagesPanel = styled.div`
  display: block;
`;

const Title = styled.h3`
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const UsersMessagesPanel = ({ users, user }) => {
  const [visible, setVisible] = useState(true);

  return (
    <MessagesPanelContainer visible={visible}>
      <MessagesPanelTitle>
        <Title visible={visible}>Messages</Title>
        <HideMessagesPanel>
          <EyeOff
            size={20}
            onClick={() => {
              console.log("YO", !visible);
              setVisible(!visible);
            }}
          />
        </HideMessagesPanel>
      </MessagesPanelTitle>
      <MessagesSearch visible={visible}>
        <Search size={20} />
      </MessagesSearch>
      <MessagesHorizontalLine visible={visible} />
      <MessagesContainer visible={visible}>
        {users.map((u, idx) => {
          if (user.userID === u.userID) {
            return <Fragment key={idx}></Fragment>;
          }
          return (
            <UserContainer key={idx} /* active */>
              <AvatarContainer>
                <AvatarImg src={u.avatar} />
                <AvatarStatus />
              </AvatarContainer>
              <MessageContentContainer>
                <MessageContentHeaderContainer>
                  <MessageContentTitle>{u.username}</MessageContentTitle>
                  <MessageContentSubtitle>User</MessageContentSubtitle>
                </MessageContentHeaderContainer>
                {/* <MessagePreviewContainer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo risus, efficitur ut
              nisl in, bibendum elementum lacus. Mauris sed nunc maximus, hendrerit velit ac, tempor
              erat. Vivamus
          </MessagePreviewContainer> */}
              </MessageContentContainer>
              {/* <MessageNotificationsContainer>
            <MessageNotifications>4</MessageNotifications>
          </MessageNotificationsContainer> */}
            </UserContainer>
          );
        })}
      </MessagesContainer>
    </MessagesPanelContainer>
  );
};

export default UsersMessagesPanel;
