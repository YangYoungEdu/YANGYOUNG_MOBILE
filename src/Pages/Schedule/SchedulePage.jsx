import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTabs from "../../Custom/useTabs";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../Assets/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../Assets/RightArrow.svg";
import { getDailySchedule } from "../../API/ScheduleAPI";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const generateWeekArray = (date) => {
  const calendarYear = date.getFullYear();
  const calendarMonth = date.getMonth();
  const calendarToday = date.getDate();
  const calendarMonthTodayDay = (date.getDay() + 6) % 7; // 월요일을 주의 시작으로 설정

  const arWeek = [null, null, null, null, null, null, null];

  let addDay = 0;
  for (let index = calendarMonthTodayDay; index < 7; index++) {
    arWeek[index] = new Date(
      calendarYear,
      calendarMonth,
      calendarToday + addDay
    );
    addDay++;
  }

  addDay = 0;
  for (let index = calendarMonthTodayDay - 1; index >= 0; index--) {
    --addDay;
    arWeek[index] = new Date(
      calendarYear,
      calendarMonth,
      calendarToday + addDay
    );
  }

  return arWeek;
};

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState({
    lectureList: [],
    taskList: [],
  });
  const [focusedIdx, setFocusedIdx] = useState(0);
  const content = [
    {
      tab: "수업 스케줄",
      content: (
        <ScheduleContainer>
          {scheduleData.lectureList.map((lecture) => (
            <LectureItem key={lecture.id}>
              <TimeSlot>
                <Rect />
                <div>{`${lecture.startTime.hour}:${lecture.startTime.minute} - ${lecture.endTime.hour}:${lecture.endTime.minute}`}</div>
              </TimeSlot>
              <LectureBox onClick={() => goToLectureDetail(lecture)}>
                <div>{lecture.name}</div>
                <LectureDetail>{`${lecture.room} | ${lecture.teacher}`}</LectureDetail>
              </LectureBox>
            </LectureItem>
          ))}
        </ScheduleContainer>
      ),
    },
    {
      tab: "ToDoList",
      content: (
        <ScheduleContainer>
          {scheduleData.taskList.map((task) => (
            <LectureItem key={task.id}>
              <LectureBox>
                <div>{task.content}</div>
              </LectureBox>
            </LectureItem>
          ))}
        </ScheduleContainer>
      ),
    },
  ];

  const { currentItem, changeItem } = useTabs(0, content);

  const handleChange = (index) => {
    changeItem(index);
    setFocusedIdx(index);
  };

  const weekArray = generateWeekArray(currentDate);
  const navigate = useNavigate();

  const goToLectureDetail = (lecture) => {
    navigate(`/schedule/${lecture.id}`, { state: { lecture } });
  };

  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd", { locale: ko });
    const fetchSchedule = async () => {
      try {
        const response = await getDailySchedule(formattedDate);
        setScheduleData(response);
      } catch (error) {
        console.error("Failed to fetch daily schedule", error);
      }
    };
    fetchSchedule();
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      const formattedDate = format(new Date(), "yyyy-MM-dd", { locale: ko });
      try {
        const response = await getDailySchedule(formattedDate);
        setScheduleData(response);
      } catch (error) {
        console.error("Failed to fetch daily schedule", error);
      }
    };
    fetchSchedule();
  }, []);

  return (
    <MainDiv>
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
      </MaterialTabArea>
      <Controls>
        <LeftButtons>
          <WeekRange>
            {weekArray[0].toLocaleDateString()} -{" "}
            {weekArray[6].toLocaleDateString()}
          </WeekRange>
          <LeftArrow onClick={goToPreviousWeek} />
          <RightArrow onClick={goToNextWeek} />
        </LeftButtons>
        <Button onClick={goToToday}>Today</Button>
      </Controls>
      <CalendarContainer>
        <WeekCalendar>
          {weekArray.map((date, index) => (
            <Day
              key={index}
              onClick={() => handleDateClick(date)}
              selected={
                selectedDate &&
                date.toDateString() === selectedDate.toDateString()
              }
            >
              <DayLabel>
                {date.toLocaleDateString("ko-KR", { weekday: "short" })}
              </DayLabel>
              <DateLabel
                selected={
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString()
                }
              >
                {date.getDate()}
              </DateLabel>
            </Day>
          ))}
        </WeekCalendar>
      </CalendarContainer>

      <ContentArea>{currentItem.content}</ContentArea>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 100vw;
  position: fixed;
  top:0;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: default;

`;

const CalendarContainer = styled.div`
  width: 100%;
  height: 30%;
`;

const Title = styled.div`
  font-family: Pretendard Variable;
  font-size: 23px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 24px 0 24px;
  box-sizing: border-box;
`;

const LeftButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 51px;
  height: 26px;
  padding: 10px 0px 10px 0px;
  border-radius: 5px;
  border: 1px solid #d0d0d0;

  font-family: Pretendard;
  font-size: 11px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  color: #757575;

  cursor: pointer;
`;

const WeekRange = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: #6b6b6b;
`;

const WeekCalendar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const DayLabel = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  color: #6b6b6b;
`;

const DateLabel = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;

  color: ${({ selected }) => (selected ? "#95C25C" : "#242424")};
  cursor: pointer;
`;

const ScheduleContainer = styled.div`
  margin-top: 23px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  padding: 23px 26px 23px 26px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  gap: 30px;
`;

const LectureItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

const Rect = styled.div`
  width: 3px;
  height: 17px;
  background-color: #95c25c;
`;

const TimeSlot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
`;

const LectureBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;

  width: 100%;
  height: 66px;
  padding: 16px 12px 16px 12px;
  box-sizing: border-box;

  border-radius: 7px;

  background-color: white;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 600;
  line-height: 15.51px;
  text-align: left;
`;

const LectureDetail = styled.div`
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 400;
  line-height: 11.93px;
  text-align: left;
  color: #595959;
`;

const MaterialTabArea = styled.div`
  width: 100%;
  /* height: 100%; */
  gap: 0px;
  border-radius: 20px 20px 0px 0px;
  background-color: white;
  display: flex;
  flex-direction: column;
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
export default SchedulePage;
