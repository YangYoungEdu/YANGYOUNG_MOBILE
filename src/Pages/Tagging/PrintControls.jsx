// PrintControls.js
import React, { useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ReactToPrint from "react-to-print";
import Nemonic from "./Nemonic";

const PrintControls = ({ onClose, scheduleData }) => {
  const componentRef = useRef();
  const taskCount = scheduleData.taskList.length;
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    console.log("componentRef", componentRef);
    const timeoutId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Set a timeout to close the modal after 60 seconds
    const closingTimeoutId = setTimeout(() => {
      onClose();
    }, 60000);

    // Clear intervals and timeouts on component unmount
    return () => {
      clearInterval(timeoutId);
      clearTimeout(closingTimeoutId);
    };
  }, [onClose]);

  return (
    <>
      <GlobalStyle />
      <ModalWrapper>
        <ModalContent>
          <Top>
            <Name>{scheduleData.student.name}</Name>
            <Right>
              {/* <div>{studentTodayStateValue.localDate}</div> */}
              <div>{scheduleData.student.school}</div>
            </Right>
          </Top>
          <Bottom>
            <Section>
              <br />
              <Hello>
                오늘 {scheduleData.lectureList.length}
                개의 수업이 있습니다.
              </Hello>
              {scheduleData.lectureList ? (
                <StyledTable>
                  <tbody>
                    {scheduleData.lectureList &&
                      scheduleData.lectureList.map((lecture, index) => (
                        <tr key={lecture.id}>
                          <td key={lecture.id}>
                            {/* {lecture.homeRoom
                              ? `${index+1}. ${lecture.name}: 홈룸(${lecture.homeRoom}) - 강의실(${lecture.lectureRoom})`
                              : `${index+1}. ${lecture.name} - 강의실(${lecture.lectureRoom})`} */}

                            {`${lecture.name}`}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </StyledTable>
              ) : (
                <p>오늘 수업이 없습니다.</p>
              )}
            </Section>

            <Section>
              <Hello>
                오늘 {taskCount}
                개의 할 일이 있습니다.
              </Hello>
              {scheduleData.taskList ? (
                <StyledTable>
                  <tbody>
                    {scheduleData.taskList &&
                      scheduleData.taskList.map((task) => (
                        <tr key={task.id}>
                          <td>{task.content}</td>
                        </tr>
                      ))}
                  </tbody>
                </StyledTable>
              ) : (
                <p>오늘 할 일이 없습니다.</p>
              )}
            </Section>
          </Bottom>
          <Container>
            <ButtonContainer>
              <CloseButton onClick={onClose}>닫기</CloseButton>
              <ReactToPrint
                trigger={() => <CloseButton>인쇄</CloseButton>}
                content={() => componentRef.current}
              />
            </ButtonContainer>
            <Small>{`${remainingTime}초 후에 자동으로 닫힙니다.`}</Small>
            <Display>
              <Nemonic scheduleData={scheduleData} ref={componentRef} />
            </Display>
          </Container>
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

const Display = styled.div`
  display: none;
`;

const Container = styled.div`
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const CloseButton = styled.button`
  background-color: #15521d;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 10px;
  &:hover {
    background-color: #0f3c15;
  }
`;

const Small = styled.div`
  color: grey;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}
`;

const StyledTable = styled.table`
  width: 100%;
  font-size: 25px;
  border-collapse: collapse;
  margin-top: 10px;
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
`;

const Name = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-left: 5%;
  width: 45%;
`;

const Top = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  background: #126140;
  color: #fff;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
`;

const Hello = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  margin-bottom: 20px;
`;

const Section = styled.div``;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  width: 70%;
  height: auto;
  background: #f5f1ea;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
export default PrintControls;
