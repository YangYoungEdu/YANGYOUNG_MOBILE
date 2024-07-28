import React, { useState } from "react";
import Calendar from "react-calendar";
import "./CustomCalendar.css";
import moment from "moment";
import styled from "styled-components";
import { ReactComponent as DownloadIcon } from "../../Assets/DownloadIcon.svg";
import { ReactComponent as CalendarIcon } from "../../Assets/Calendar.svg";

const PrevMaterial = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <MainDiv>
      <Control>
      <CalendarIcon onClick={toggleCalendar} />
        <DateDiv>{selectedDate.toLocaleDateString()}</DateDiv>
      </Control>
      {showCalendar && (
        <CalendarOverlay onClick={toggleCalendar}>
          <CalendarContainer onClick={(e) => e.stopPropagation()}>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              formatDay={(locale, date) => moment(date).format("DD")}
              tileClassName={({ date, view }) =>
                date.getTime() === selectedDate.getTime()
                  ? "selected-date"
                  : null
              }
            />
          </CalendarContainer>
        </CalendarOverlay>
      )}
      <ItemBox>
        자료 이름
        <DownloadIcon />
      </ItemBox>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 12px;
  width: 100%;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
`;

const Control = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2%;
  width: 100%;
  cursor: pointer;
`;

const DateDiv = styled.div`
  margin-top: 12px;
  margin-bottom: 9px;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
`;

const CalendarOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CalendarContainer = styled.div`
  position: fixed;
  bottom: 0;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding-top: 20px;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 24px 15px 24px 13px;
  border-radius: 10px;
  box-sizing: border-box;

  background-color: #f2f2f2;
  color: #555555;

  font-family: Pretendard;
font-size: 13px;
font-weight: 500;
line-height: 15.51px;

`;

export default PrevMaterial;
