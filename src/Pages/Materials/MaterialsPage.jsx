import React from "react";
import styled from "styled-components";
import useTabs from "../../Custom/useTabs";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../Assets/BackArrow.svg";
import { ReactComponent as TeacherIcon } from "../../Assets/TeacherIcon.svg";
import { ReactComponent as LectureRoomIcon } from "../../Assets/LectureRoomIcon.svg";
import { ReactComponent as TimeIcon } from "../../Assets/TimeIcon.svg";

const content = [
  {
    tab: "이번주 수업 자료",
    content: "이번주 수업 자료 내용",
  },
  {
    tab: "이전 수업 자료",
    content: "이전 수업 자료 내용",
  },
];

const MaterialsPage = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  const [focusedIdx, setFocusedIdx] = React.useState(0);
  const navigate = useNavigate();
  const moveToPrev = () => {
    navigate("/schedule");
  };

  const handleChange = (index) => {
    changeItem(index);
    setFocusedIdx(index);
  };

  return (
    <MainDiv>
      <Controls>
        <BackArrow onClick={() => moveToPrev()}/>
        <div>수업 정보</div>
        <div></div>
      </Controls>

      <LectureInfo>
        <Title>고1 컨설팅</Title>

        <LectureDetail>
          <LectureDetailItem>
            <TeacherIcon />
            선생님
          </LectureDetailItem>
          <LectureDetailItem>
            <LectureRoomIcon />
            강의실
          </LectureDetailItem>
          <LectureDetailItem>
            <TimeIcon />
            시간
          </LectureDetailItem>
        </LectureDetail>
      </LectureInfo>

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
        {/* <StyledHr /> */}
        <ContentArea>
          <p>{currentItem.content}</p>
        </ContentArea>
      </MaterialTabArea>
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
  margin-top:20px;
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
  border: none;
  background-color: rgba(0, 0, 0, 0);
  padding: 10px;
  font-size: 16px;
`;

const StyledHr = styled.hr`
  width: 327px;
  height: 0px;
  border: 1px solid #b5b5b5;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #b5b5b5;
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
  padding: 20px;
  text-align: center;
`;

export default MaterialsPage;
