import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useTabs from "../../Custom/useTabs";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../Assets/BackArrow.svg";
import { ReactComponent as TeacherIcon } from "../../Assets/TeacherIcon.svg";
import { ReactComponent as LectureRoomIcon } from "../../Assets/LectureRoomIcon.svg";
import { ReactComponent as TimeIcon } from "../../Assets/TimeIcon.svg";
import TodayMaterial from "./TodayMaterial";
import PrevMaterial from "./PrevMaterial";
import Layout from "../../Layout";

const MaterialsPage = () => {
  const location = useLocation();
  const { lecture } = location.state || {};
  const navigate = useNavigate();

  const moveToPrev = () => {
    navigate("/schedule");
  };

  const [focusedIdx, setFocusedIdx] = useState(0);

  const content = lecture
    ? [
        {
          tab: "오늘 수업 자료",
          content: (
            <TodayMaterial
              lectureDate={lecture.lectureDate}
              lectureId={lecture.id}
            />
          ),
        },
        {
          tab: "지난 수업 자료",
          content: (
            <PrevMaterial
              lectureDate={lecture.lectureDate}
              lectureId={lecture.id}
            />
          ),
        },
      ]
    : [];

  const { currentItem, changeItem } = useTabs(0, content);

  const handleChange = (index) => {
    changeItem(index);
    setFocusedIdx(index);
  };

  return (
    <MainDiv>
      <Background>
        <Controls>
          <BackArrow onClick={moveToPrev} />
          <div>수업 정보</div>
          <div></div>
        </Controls>

        <LectureInfo>
          <Title>{lecture.name}</Title>
          <LectureDetail>
            <LectureDetailItem>
              <TeacherIcon />
              {lecture.teacher} 선생님
            </LectureDetailItem>
            <LectureDetailItem>
              <LectureRoomIcon />
              {lecture.room || "강의실 정보 없음"}
            </LectureDetailItem>
            <LectureDetailItem>
              <TimeIcon />
              {lecture.startTime.hour}:{lecture.startTime.minute} -{" "}
              {lecture.endTime.hour}:{lecture.endTime.minute}
            </LectureDetailItem>
          </LectureDetail>
        </LectureInfo>
      </Background>

      <MaterialTabArea>
        <MaterialTabs>
          {content.map((section, index) => (
            <TabButton
              key={index}
              onClick={() => handleChange(index)}
              isSelected={index === focusedIdx}
            >
              {section.tab}
            </TabButton>
          ))}
        </MaterialTabs>

        <SliderContainer>
          <Slider focusedIdx={focusedIdx} />
        </SliderContainer>

        <ContentArea>{currentItem.content}</ContentArea>
      </MaterialTabArea>
      <Layout />
    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e0e6d8;

  cursor: default;
`;

const Background = styled.div`
  margin-top: 7.88%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0 24px 0 24px;
  box-sizing: border-box;
`;
const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

const LectureInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 32px;
  gap: 20px;
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 26px;
  font-weight: 700;
  line-height: 22px;
`;

const LectureDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
`;

const LectureDetailItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  color: #565656;
`;

const MaterialTabArea = styled.div`
  width: 100%;
  height: 100%;
  gap: 0px;
  border-radius: 20px 20px 0px 0px;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 32px 29px 32px 29px;
  box-sizing: border-box;
`;

const MaterialTabs = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  position: relative;
`;

const TabButton = styled.button`
  cursor: pointer;
  transition: color 0.3s;
  color: ${(props) => (props.isSelected ? "#95C25C" : "#B5B5B5")};
  font-weight: ${(props) => (props.isSelected ? "700" : "600")};

  border: none;
  background-color: rgba(0, 0, 0, 0);
  padding: 10px;
  font-size: 16px;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #b5b5b5;
  margin-top: 8px;
`;

const Slider = styled.div`
  position: absolute;
  left: 0;
  width: ${(props) => 100 / 2}%; /* Number of tabs */
  height: 1.5px;
  background-color: #95c25c;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => props.focusedIdx * 100}%);
`;

const ContentArea = styled.div`
  width: 100%;
  text-align: center;
`;

export default MaterialsPage;
