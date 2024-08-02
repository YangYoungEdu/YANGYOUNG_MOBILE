import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginCheck } from "./Atom";
import { signOut } from "./API/AuthAPI";

const Layout = () => {
  const [loginState, setLoginState] = useRecoilState(loginCheck);
  const [showLogoutButton, setShowLogoutButton] = useState(true);

  console.log(loginState);

  useEffect(() => {
    setShowLogoutButton(loginState);
  }, [loginState]);

  return (
    <Div>
      {showLogoutButton && (
        <Header>
          <LogOut onClick={signOut}>로그아웃</LogOut>
        </Header>
      )}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  box-sizing: border-box;
  z-index: 10;
  background-color: transparent;
`;

const LogOut = styled.div`
  font-size: 10px;
  color: #6b6b6b;
  cursor: pointer;
  &:active{
    text-decoration: underline;
  }
`;

export default Layout;
