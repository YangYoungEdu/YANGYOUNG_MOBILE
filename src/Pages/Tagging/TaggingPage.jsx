import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { postAttendance } from "../../API/AttendanceAPI";
import { getDailySchedule } from "../../API/ScheduleAPI";
import backImg from "../../Assets/Group 1.svg";
import { serialNumberState } from "../../Atom";
import PrintControls from "./PrintControls";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const TaggingPage = () => {
  const navigate = useNavigate();

  const inputRef = useRef();

  const [serialNumber, setSerialNumber] = useRecoilState(serialNumberState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    student: {},
    lectureList: [],
    taskList: [],
  });

  //모달창 state 체크
  useEffect(() => {
    checkModal();
  }, [isModalOpen]);

  const handleLogin = async () => {
    try {
      await postAttendance(serialNumber);
      console.log("출석 완료");
      fetchData();
      setIsModalOpen(true);
    } catch (error) {
      if (error.message === "404") {
        alert("ID에 해당하는 학생 정보가 없습니다.");
        inputRef.current.focus();
        return null;
      }
    }
  };
  const formattedDate = format(new Date(), "yyyy-MM-dd", { locale: ko });
  //id를 기반으로 학생 정보 및 오늘의 정보 패치
  const fetchData = async () => {
    
    try {
      const response = await getDailySchedule(serialNumber, formattedDate);
      setScheduleData(response);
    } catch (error) {
      console.error("Failed to fetch daily schedule", error);
    }
  };

  const handleInputChange = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(serialNumber);
      handleLogin();
    }
  };

  const checkModal = () => {
    if (isModalOpen === false) {
      setSerialNumber("");
    }
  };

  return (
    <Div>
      <TextDiv>
        <Title1>
          양영학원
          <br />
          고등관
        </Title1>
        <Container>
          변화된 교육!
          <br />그 정상에
          <br />
          항상
          <br />
          양영학원이
          <br />
          있습니다.
        </Container>
      </TextDiv>
      <AttendanceField>
        <Content2>출석</Content2>
        <Inputing
          type="text"
          ref={inputRef}
          autoFocus
          placeholder="좌측에서 QR코드를 읽혀주세요"
          value={serialNumber}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </AttendanceField>
      {isModalOpen && (
        <PrintControls
          onClose={() => {
            setIsModalOpen(false);
            inputRef.current.focus();
          }}
          scheduleData={scheduleData}
          formattedDate={formattedDate}
        ></PrintControls>
      )}
      <Img src={backImg}></Img>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  width: 1080px;
  height: 1920px;
  margin: auto 0;
  background-color: #15521d;
  position: relative;
  overflow: hidden;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
const AttendanceField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
const Title1 = styled.div`
  padding-top: 377px;
  margin-left: 37px;

  font-family: BM Hanna Pro;
  font-size: 180px;
  font-weight: 400;
  line-height: 206px;
  letter-spacing: 0em;
  text-align: left;
  color: #15521d;
  position: absolute;
`;

const Container = styled.div`
  width: 534px;
  height: 565px;
  margin-top: 851px;
  margin-left: 37px;
  font-family: BM Hanna Air;
  font-size: 110px;
  font-weight: 400;
  line-height: 113px;
  letter-spacing: 0em;
  text-align: left;
  color: #15521d;
  position: absolute;
`;

const Content2 = styled.div`
  color: #fff;
  font-family: BM Hanna Air;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #fff;
  margin-top: 1472px;
  margin-left: 617px;
  position: absolute;
`;

const Inputing = styled.input`
  background-color: white;
  width: 400px;
  height: 65px;
  flex-shrink: 0;
  margin-left: 617px;
  font-family: BM Hanna Air;
  font-size: 30px;
  text-align: center;
  margin-top: 1542px;
  position: absolute;
`;

const Img = styled.img``;
export default TaggingPage;
