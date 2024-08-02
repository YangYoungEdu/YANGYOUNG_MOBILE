import axios from "axios";

const prod = process.env.REACT_APP_PROD_URL;
const dev = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

export const postAttendance = async (studentId) => {
    console.log ("sid: ", studentId);
  try {
    const response = await axios.post(`${prod}attendance/${studentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    const errorStatus = error.response.status;
    if (errorStatus === 404) {
      throw new Error(errorStatus);
    } else if (errorStatus === 400) {
      throw new Error(errorStatus);
    }
  }
};
