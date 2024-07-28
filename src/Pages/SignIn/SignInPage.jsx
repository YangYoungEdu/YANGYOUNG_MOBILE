import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../API/AuthAPI";
import styled from "styled-components";
import { loginCheck } from "../../Atom";
import { ReactComponent as CloseIcon } from "../../Assets/CloseIcon.svg"; // CloseIcon.svg를 추가했다고 가정합니다.
import { useRecoilState } from "recoil";

const SignInPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useRecoilState(loginCheck);

  const navigate = useNavigate();

  // signup 페이지로 이동시 로그아웃
  useEffect(() => {
    setLoginState(false);
  }, []);

  // 로그인 버튼 클릭 시 페이지 이동 및 로그인 상태 변수 관리
  const handleLoginClick = async () => {
    signIn(id, password).then((res) => {
      setLoginState(true);
      localStorage.setItem("accessToken", res.jwtToken.accessToken);
      localStorage.setItem("refreshToken", res.jwtToken.refreshToken);
      navigate("/schedule");
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLoginClick();
    }
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clearInput = (setter) => {
    setter("");
  };

  return (
    <MainDiv>
      <Title>로그인</Title>
      <LoginField>
        <InputWrapper>
          <StyledInput
            type="text"
            placeholder="아이디"
            value={id}
            onChange={handleIdChange}
          />
          {id && <CloseButton onClick={() => clearInput(setId)} />}
        </InputWrapper>
        <InputWrapper>
          <StyledInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
          />
          {password && <CloseButton onClick={() => clearInput(setPassword)} />}
        </InputWrapper>
        <StyledButton disabled={!id || !password} onClick={handleLoginClick}>
          로그인
        </StyledButton>
      </LoginField>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px 0 24px;
`;

const Title = styled.div`
  font-family: Pretendard Variable;
  font-size: 23px;
  font-weight: 700;
  line-height: 27.45px;
  text-align: center;
  cursor: default;
`;

const LoginField = styled.div`
  margin-top: 46px;
  gap: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 327px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 58px;
  padding: 20px 15px;
  border-radius: 12px;
  border: 1px solid #bababa;
  box-sizing: border-box;

  font-family: Pretendard Variable;
  font-size: 15px;
  font-weight: 400;
  line-height: 17.9px;
  text-align: left;

  &::placeholder {
    color: #bababa;
  }

  &:focus {
    border: 1px solid #95c25c;
  }
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  width: 327px;
  height: 41px;
  padding: 20px 15px;
  border-radius: 100px;
  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#95C25C")};
  box-sizing: border-box;

  font-family: Pretendard Variable;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: white;
  white-space: nowrap;

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

export default SignInPage;
