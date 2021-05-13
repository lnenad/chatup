import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../colors';

const LoginPanelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-basis: 32rem;
  flex: 1;
  background-color: #f5f6f8;
`;

const LoginPanelHeaderContainer = styled.div`
  display: flex;
  margin: 1rem 1.5rem;
  align-items: center;
`;

const LoginPanelContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
`;

const LoginHorizontalLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${colors.lightestGray};
  opacity: 0.5;
  padding: 0;
  margin: 0 0 1rem 1rem;
`;

const LoginInputContainer = styled.form`
  display: flex;
  align-items: center;
  background-color: ${colors.messageInputBackground};
  padding: 1.5rem; 
  margin: auto;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeaderSubtitle = styled.div`
  color: ${colors.darkGray};
  line-height: 1rem;
  font-size: 0.9rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`;

const HeaderTitle = styled.div`
  color: ${colors.lightBlack};
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  margin-left: 1rem;
`;

const LoginInputText = styled.input`
  width: 100%;
  padding: 10px;
  height: 30px;
  border: none;
  margin: 1rem;
  color: ${colors.inputColor};
`;

const LoginInputButton = styled.input`
  height: 50px;
  font-size: 100%;
  font: inherit;
  background: white;
  border: 1px solid #2f3a3d;
  margin-top: 5px;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const LoginPanel = ({ loginUser }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();
    loginUser(userName, password);
    setUserName('');
    setPassword('');
  };

  return (
    <LoginPanelContainer>
      <LoginPanelHeaderContainer>
        <HeaderTitle>Login</HeaderTitle>
        <HeaderSubtitle>Enter your credentials</HeaderSubtitle>
      </LoginPanelHeaderContainer>
      <LoginHorizontalLine />
      <LoginPanelContentContainer>
        <LoginInputContainer onSubmit={submit}>
          <h3>Username</h3>
          <LoginInputText
            value={userName}
            onChange={e => {
              e.preventDefault();
              setUserName(e.target.value);
            }}
            placeholder="Username"
          />
          <h3>Password</h3>
          <LoginInputText
            type="password"
            value={password}
            onChange={e => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <LoginInputButton type="submit" title="Login to the app" value="Login" onClick={submit} />
        </LoginInputContainer>
      </LoginPanelContentContainer>
    </LoginPanelContainer>
  );
};

export default LoginPanel;
