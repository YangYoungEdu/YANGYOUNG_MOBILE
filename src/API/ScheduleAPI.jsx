import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

// 학생 날짜별 스케줄 조회 API
// export const getDailySchedule = async (studentId, date) => {
//   console.log(studentId, date);
//   try {
//     const response = await axios.get(`${server}student/schedule`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//       params: {
//         studentId: studentId,
//         date: date,
//       },
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     if(error.response.status === 403){
//       alert("로그인 후 이용해주세요.");
//       window.location.href = "/";
//     };
//     console.error(error);
//     throw error;
//   }
// };

export const getDailySchedule = async (date) => {
  console.log(date);
  try {
    const response = await axios.get(`${server}student/schedule`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        studentId: 22400001,
        date: date,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    }
    console.error(error);
    throw error;
  }
};
