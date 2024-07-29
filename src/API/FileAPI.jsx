import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;
const local = process.env.REACT_APP_LOCAL_URL;

export const getDailyFile = async (lectureId, lectureDate) => {
  console.log(lectureId, lectureDate);
  try {
    const response = await axios.get(`${server}file`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        lectureId: lectureId,
        date: lectureDate,
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

export const downloadFile = async (lectureId, lectureDate, fileName) => {
  console.log("download api requests: ", lectureId, lectureDate, fileName);
  try {
    const response = await axios.get(`${server}file/download`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        lectureId: lectureId,
        date: lectureDate,
        fileName: fileName,
      },
      responseType: "blob",
    });

    const fileBlob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    const contentDisposition = response.headers["content-disposition"];
    const downloadFileName = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : "default_filename.json";

    const fileURL = window.URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", downloadFileName);
    document.body.appendChild(link);
    link.click();

    // 리소스 해제
    link.remove();
    window.URL.revokeObjectURL(fileURL);

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/";
    } else {
      console.error("파일 다운로드 실패:", error);
    }
    throw error;
  }
};
