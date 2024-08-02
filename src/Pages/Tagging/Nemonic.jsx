import React from "react";
import styled from "styled-components";

const Nemonic = React.forwardRef(({ scheduleData }, ref) => {
  if (!scheduleData) return null; // Return null if no data is provided

  return (
    <ModalContent ref={ref}>
      <Top>
        {scheduleData.student && scheduleData.student.name} ({scheduleData.student && scheduleData.student.school})
      </Top>
      <div>
        {scheduleData.lectureList ? (
          <StyledTable>
            <tbody>
              {scheduleData.lectureList.map((lecture) => (
                <tr key={lecture.id}>
                  <td>
                    {`${lecture.name}`}
                    {/* {`(${isValidTime(lecture.startTime)
                        ? lecture.startTime.slice(0, 5)
                        : "Invalid time"}~${isValidTime(lecture.endTime)
                        ? lecture.endTime.slice(0, 5)
                        : "Invalid time"}, ${lecture.room})`} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <p>오늘 수업이 없습니다.</p>
        )}
      </div>
      <div>
        {scheduleData.taskList ? (
          <StyledTable>
            <tbody>
              {scheduleData.taskList.map((task) => (
                <tr key={task.id}>
                  <td>{task.content}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <p>오늘 할 일이 없습니다.</p>
        )}
      </div>
    </ModalContent>
  );
});

const ModalContent = styled.div`
  width: 500px;
  height: 297px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  
  td {
    padding: 8px;
    border: 1px solid #ddd;
  }
`;

const Top = styled.div`
  font-weight: bold;
  margin-bottom: 0.5px;
`;

export default Nemonic;
