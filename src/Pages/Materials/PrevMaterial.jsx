import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import styled from "styled-components";
import { ReactComponent as DownloadIcon } from "../../Assets/DownloadIcon.svg";
import { ReactComponent as CalendarIcon } from "../../Assets/Calendar.svg";
import { getDailyFile, downloadFile } from "../../API/FileAPI";
import { format } from "date-fns";
import "./CustomCalendar.css";

const PrevMaterial = ({ lectureDate, lectureId }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);  // 초기값 제거
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchFileList = async () => {
      if (selectedDate) {
        try {
          const formattedDate = format(selectedDate, "yyyy-MM-dd");
          const response = await getDailyFile(lectureId, formattedDate);
          setFileList(response);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };
    fetchFileList();
  }, [lectureId, selectedDate]);

  const handleDownloadClick = (fileName) => {
    return () => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      downloadFile(lectureId, formattedDate, fileName);
    };
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <MainDiv>
      <Control onClick={toggleCalendar}>
        <CalendarIcon />
        <DateDiv>{selectedDate ? selectedDate.toLocaleDateString() : "수업 일자를 선택하세요."}</DateDiv>
      </Control>
      {showCalendar && (
        <CalendarOverlay onClick={toggleCalendar}>
          <CalendarContainer onClick={(e) => e.stopPropagation()}>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              maxDate={new Date()}  // 현재 날짜까지 선택 가능
              formatDay={(locale, date) => moment(date).format("DD")}
              tileClassName={({ date, view }) =>
                date.getTime() === (selectedDate ? selectedDate.getTime() : 0) ? "selected-date" : null
              }
            />
          </CalendarContainer>
        </CalendarOverlay>
      )}
      {fileList.length > 0 ? (
        fileList.map((file, index) => (
          <ItemBox key={index}>
            {file.name}
            <DownloadIcon onClick={handleDownloadClick(file.name)} />
          </ItemBox>
        ))
      ) : (
        <ItemBox>등록된 파일이 없습니다 :{"("}</ItemBox>
      )}
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
  gap: 10px;
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
margin-bottom: 3px;
`;

export default PrevMaterial;
