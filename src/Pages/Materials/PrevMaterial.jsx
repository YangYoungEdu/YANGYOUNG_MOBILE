import styled from "styled-components";
import { ReactComponent as DownloadIcon } from "../../Assets/DownloadIcon.svg";
import { ReactComponent as Calendar } from "../../Assets/Calendar.svg";

const PrevMaterial = () => {
  return (
    <MainDiv>
      <Control>
        <div>날짜</div>
        <Calendar />
      </Control>
      <ItemBox>
        자료 이름
        <DownloadIcon />
      </ItemBox>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 12px;
  width: 100%;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
`;

const Control = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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
`;
export default PrevMaterial;
