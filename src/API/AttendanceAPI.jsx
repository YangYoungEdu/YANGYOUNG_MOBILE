import axios from "axios";

const prod = process.env.REACT_APP_PROD_URL;
const dev = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

export const postAttendance = async (studentId) => {
    console.log("sid: ", studentId);
    try {
      const response = await axios.post(`${prod}attendance/${studentId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,  // 인증 토큰 포함
        },
      });
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      const errorStatus = error.response.status;
      if (errorStatus === 403) {
        alert("접근이 거부되었습니다. 올바른 권한을 가지고 있는지 확인하세요.");
      }
      if (errorStatus === 404) {
        throw new Error(errorStatus);
      } else if (errorStatus === 400) {
        throw new Error(errorStatus);
      }
    }
  };
  