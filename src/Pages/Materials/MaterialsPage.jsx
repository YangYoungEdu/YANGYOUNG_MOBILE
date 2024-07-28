import React from "react";
import styled from "styled-components";
import useTabs from "../../Custom/useTabs";

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

  const handleChange = (index) => {
    changeItem(index);
    setFocusedIdx(index);
  };

  return (
    <MainDiv>
      <Controls>
        <div>뒤로가기</div>
        <div>수업 정보</div>
        <div></div>
      </Controls>

      <LectureInfo>
        <Title>고1 컨설팅</Title>

        <LectureDetail>
          <LectureDetailItem>
            <div>아이콘</div>
            선생님
          </LectureDetailItem>
          <LectureDetailItem>
            <div>아이콘</div>
            강의실
          </LectureDetailItem>
          <LectureDetailItem>
            <div>아이콘</div>
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
  justify-content: space-evenly;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

const LectureInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
`;

const LectureDetailItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
`;

const MaterialTabArea = styled.div`
  width: 100%;
  height: 552px;
  gap: 0px;
  border-radius: 20px 20px 0px 0px;
  background-color: white;
  display: flex;
  flex-direction: column;
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
  color: ${(props) => (props.isSelected ? "#000" : "#777")};
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
  background-color: #B5B5B5;
`;

const Slider = styled.div`
  position: absolute;
  left:0;
  width: ${(props) => 100 / 2}%; /* Number of tabs */
  height: 1.5px;
  background-color: #95C25C;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => props.focusedIdx * 100}%);
`;

const ContentArea = styled.div`
  padding: 20px;
  text-align: center;
`;

export default MaterialsPage;
