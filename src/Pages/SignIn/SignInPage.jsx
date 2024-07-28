import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as GoogleLogo } from "../../Assets/GoogleLogo.svg";
import { ReactComponent as CloseIcon } from "../../Assets/CloseIcon.svg"; // CloseIcon.svg를 추가했다고 가정합니다.

const SignInPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

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
            />
            {password && (
              <CloseButton onClick={() => clearInput(setPassword)} />
            )}
          </InputWrapper>
          <StyledButton disabled={!id || !password}>로그인</StyledButton>
        </LoginField>

        <HrDiv>
          <StyledHr />
          or
          <StyledHr />
        </HrDiv>
        <GoogleButton>
          <GoogleLogo />
          구글로 로그인
        </GoogleButton>
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
    border: 1px solid #95C25C;
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

const HrDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 42px;
  gap: 9px;
`;

const StyledHr = styled.hr`
  width: 148px;
  background-color: #555555;
`;

const GoogleButton = styled.button`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  margin-top: 42px;

  align-items: center;
  justify-content: center;
  width: 327px;
  height: 58px;
  padding: 20px 15px;
  gap: 9.06px;
  border-radius: 12px;
  border: 1px solid black;
  background-color: white;

  font-family: Pretendard Variable;
  font-size: 15px;
  font-weight: 400;
  line-height: 17.9px;
  cursor: pointer;
`;

export default SignInPage;
