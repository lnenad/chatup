import React, { Fragment, useRef, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

import { colors } from "../colors";

const MessagePanelContainer = styled.div`
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

const MessagePanelHeaderContainer = styled.div`
  display: flex;
  margin: 1rem 1.5rem;
  align-items: center;
`;

const MessagePanelContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  max-height: 90vh;
  overflow-y: scroll;
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

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.fromCurrentUser ? "row-reverse" : "row")};
  align-items: flex-end;
  margin-bottom: 1rem;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${(props) =>
    props.fromCurrentUser
      ? colors.messageBackgroundLightUser
      : colors.messageBackgroundLight};
  color: ${(props) =>
    props.fromCurrentUser ? colors.messageLightUser : colors.messageLight};
  padding: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: ${(props) =>
    props.fromCurrentUser ? "10px 10px 10px 0px" : "10px 10px 0px 10px"};
  max-width: 60%;
  width: auto;
`;

const MessageTitle = styled.div`
  color: ${(props) =>
    props.fromCurrentUser ? colors.messageTitleUser : colors.messageTitle};
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
`;

const MessageContent = styled.div`
  color: ${(props) =>
    props.fromCurrentUser ? colors.messageContentUser : colors.messageContent};
  line-height: 1rem;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const MessageTimestamp = styled.div`
  align-self: flex-end;
  font-size: 0.8rem;
  color: ${(props) =>
    props.fromCurrentUser
      ? colors.messageTimestampUser
      : colors.messageTimestamp};
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

const MessagePanel = ({ messages, user }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <Fragment>
      <MessagePanelHeaderContainer>
        <AvatarContainer>
          <AvatarImg src={user.avatar} />
          <AvatarStatus />
        </AvatarContainer>
        <HeaderTitle>{user.username}</HeaderTitle>
        <HeaderSubtitle>User</HeaderSubtitle>
      </MessagePanelHeaderContainer>
      <MessagesHorizontalLine />
      <MessagePanelContentContainer ref={messagesEndRef}>
        {messages.map((message, idx) => {
          return (
            <MessageContainer
              key={idx}
              fromCurrentUser={message.userID === user.userID}
            >
              <AvatarContainer>
                <AvatarImg src={message.avatar} />
                <AvatarStatus />
              </AvatarContainer>
              <Message fromCurrentUser={message.userID === user.userID}>
                <MessageTitle>{message.username}</MessageTitle>
                <MessageContent>{message.content}</MessageContent>
                <MessageTimestamp
                  fromCurrentUser={message.userID === user.userID}
                >
                  {moment(message.date).fromNow()}
                </MessageTimestamp>
              </Message>
            </MessageContainer>
          );
        })}
      </MessagePanelContentContainer>
    </Fragment>
  );
};

export default React.memo(MessagePanel, (previous, next) => {
  return !(previous.messages.length !== next.messages.length);
});
