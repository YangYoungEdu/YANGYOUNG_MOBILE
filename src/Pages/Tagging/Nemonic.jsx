import React from "react";
import styled from "styled-components";

const Nemonic = React.forwardRef((scheduleData, ref) => {
  const lectureList = scheduleData.lectureList;
  const taskList = scheduleData.taskList;
  return (
    <>
      <ModalContent ref={ref}>
        <div>
          <Top>
            {scheduleData.student && scheduleData.student.name} ({scheduleData.student && scheduleData.student.school})
          </Top>
          <div>
            {scheduleData.lectureList ? (
              <table>
                <tbody>
                  {scheduleData.lectureList &&
                    scheduleData.lectureList.map((lecture) => (
                      <tr key={lecture.id}>
                        <tr key={lecture.id}>
                          {`${lecture.name}`}
                          {/* {`(${
                            isValidTime(lecture.startTime)
                              ? lecture.startTime.slice(0, 5)
                              : "Invalid time"
                          }~${
                            isValidTime(lecture.endTime)
                              ? lecture.endTime.slice(0, 5)
                              : "Invalid time"
                          }, ${lecture.room})`}
                          <br />
                          {`${lecture.name}`} */}
                        </tr>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>오늘 수업이 없습니다.</p>
            )}
          </div>
        </div>

        <div>
          {/* <Top>{scheduleData.localDate}</Top> */}
          <div>
            <div>
              {scheduleData.taskList ? (
                <table>
                  <table>
                    <tbody>
                      {scheduleData.taskList &&
                        scheduleData.taskList.map((task) => (
                          <tr key={task.id}>
                            <td>{task.content}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </table>
              ) : (
                <p>오늘 할 일이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </ModalContent>
    </>
  );
});

const ModalContent = styled.div`
  width: 500px;
  height: 297px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;
const Top = styled.div`
  font-weight: bold;
  margin-bottom: 0.5px;
`;
export default Nemonic;
