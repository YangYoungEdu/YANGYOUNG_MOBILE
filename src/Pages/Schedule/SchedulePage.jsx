import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTabs from "../../Custom/useTabs";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../Assets/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../Assets/RightArrow.svg";
import { getDailySchedule } from "../../API/ScheduleAPI";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Layout from "../../Layout";
import { studentIdState } from "../../Atom";
import { useRecoilState } from "recoil";

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
  const [studentId, setStudentId] = useRecoilState(studentIdState);

  // 체크박스 상태 관리
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(
      scheduleData.taskList.map((task) => ({
        ...task,
        checked: false,
      }))
    );
  }, [scheduleData]);

  const handleCheckboxChange = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

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
                <LectureDetail>{`${lecture.room} | ${lecture.teacher} 선생님`}</LectureDetail>
              </LectureBox>
            </LectureItem>
          ))}
        </ScheduleContainer>
      ),
    },
    {
      tab: "To Do List",
      content: (
        <ScheduleContainer>
          {tasks.map((task) => (
            <LectureItem key={task.id}>
              <TaskBox>
                <StyledCheckbox>
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  <span></span>
                </StyledCheckbox>
                <Texts>
                  <div>{task.content}</div>
                  <LectureDetail>due date: {task.taskDate}</LectureDetail>
                </Texts>
              </TaskBox>
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


  const handleDateClick = async (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd", { locale: ko });

    if (studentId) {
      try {
        const response = await getDailySchedule(studentId, formattedDate);
        setScheduleData(response);
      } catch (error) {
        console.error("Failed to fetch daily schedule", error);
      }
    }
  };
  useEffect(() => {
    const fetchSchedule = async () => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd", { locale: ko });
      if (studentId) {
        try {
          const response = await getDailySchedule(studentId, formattedDate);
          setScheduleData(response);
        } catch (error) {
          console.error("Failed to fetch daily schedule", error);
        }
      }
    };

    fetchSchedule();
  }, [studentId, selectedDate]);

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
      <Layout />

    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: default;
  height: 100vh; /* 전체 화면 높이 */
`;

const CalendarContainer = styled.div`
  width: 100%;
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
  /* flex: 1; 나머지 공간을 차지하게 합니다 */
  margin-top: 23px;
  padding-bottom: 23px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 23px 26px 23px 26px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  gap: 30px;
  overflow-y: auto; /* 컨텐츠가 넘칠 경우 스크롤 표시 */
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
  gap: 10px;

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

const TaskBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

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
  padding: 0 29px 32px 29px;
  padding-top: 7.88%;
  box-sizing: border-box;
  flex-shrink: 0;
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
  flex: 1; /* 나머지 공간을 차지하게 합니다 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 내부 스크롤을 숨깁니다 */
`;

const StyledCheckbox = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: #95c25c;
      border-color: #95c25c;
    }

    &:checked ~ span:after {
      display: block;
    }
  }

  span {
    position: relative;
    height: 20px;
    width: 20px;
    background-color: #f1f1f1;
    border: 2px solid #d0d0d0;
    border-radius: 4px;
    transition: all 0.2s;

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
`;

const Texts = styled.div`
  align-items: flex-start;
  gap: 3px;
`;

const TaskContent = styled.div`
  font-size: 15px;
`;
export default SchedulePage;
