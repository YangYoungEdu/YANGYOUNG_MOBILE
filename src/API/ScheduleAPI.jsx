import axios from "axios";

const prod = process.env.REACT_APP_PROD_URL;
const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

export const getDailySchedule = async (studentId, date) => {
  console.log(date);
  try {
    const response = await axios.get(`${prod}student/schedule`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        studentId: studentId,
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
