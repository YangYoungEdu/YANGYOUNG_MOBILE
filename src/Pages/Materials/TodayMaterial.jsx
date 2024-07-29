import styled from "styled-components";
import { ReactComponent as DownloadIcon } from "../../Assets/DownloadIcon.svg";
import { getDailyFile, downloadFile } from "../../API/FileAPI";
import { useEffect, useState } from "react";

const TodayMaterial = ({ lectureDate, lectureId }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchFileList = async () => {
      try {
        const response = await getDailyFile(lectureId, lectureDate);
        setFileList(response);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchFileList();
  }, [lectureId, lectureDate]);

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const handleDownloadClick = (fileName) => {
    return () => downloadFile(lectureId, lectureDate, fileName);
  };

  return (
    <MainDiv>
      <DateDiv>{lectureDate}</DateDiv>
      {fileList.map((file, index) => (
        <ItemBox key={index}>
          {file.name}
          <DownloadIcon onClick={handleDownloadClick(file.name)} />
        </ItemBox>
      ))}
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 12px;
  width: 100%;
`;

const DateDiv = styled.div`
  margin-top: 12px;
  margin-bottom: 9px;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
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
`;
export default TodayMaterial;
