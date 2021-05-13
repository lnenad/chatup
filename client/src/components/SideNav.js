import React from "react";
import styled from "styled-components";
import { MessageSquare, Command } from "react-feather";
import { colors } from "../colors";

const SideNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-basis: 5rem;
  padding-top: 0.75rem;
  background-color: ${colors.sideBackground};
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  position: relative;
  margin-bottom: 4rem;
`;

const AvatarImg = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
`;

const NavContainer = styled.div`
  width: 100%;
  color: ${colors.messageBackgroundLight};
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem 0;
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#91C68B" : null)};
`;

const SideNav = ({ user, page, setPage }) => (
  <SideNavContainer>
    <AvatarContainer>
      <AvatarImg src={user.avatar} />
    </AvatarContainer>
    <NavContainer>
      {user.admin && (
        <NavItem onClick={() => setPage("admin")} selected={page === "admin"} title="Administration">
          <Command size={30} />
        </NavItem>
      )}
      <NavItem onClick={() => setPage("chat")} selected={page === "chat"} title="Messages">
        <MessageSquare size={30} />
      </NavItem>
    </NavContainer>
  </SideNavContainer>
);

export default SideNav;
