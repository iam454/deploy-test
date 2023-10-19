import React from "react";
import styled from "styled-components";
import MyInfos from "./MyInfos";
import Text from "./Text";

const Profile = styled.div`
  padding: 8px 0;
  border-top: 1px solid ${(props) => props.theme.white};
  border-bottom: 1px solid ${(props) => props.theme.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  filter: ${(props) => (props.$isLinked ? "none" : "grayScale(100)")};
`;

const InstaButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.white};
  padding: 0;
  font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
`;

const InstaProfile = ({ isLinked, infos }) => {
  const handleButtonClick = () => {
    if (!isLinked) {
      console.log("인스타 연결하기");
    } else {
      console.log("연결해제");
      console.log("후순위 고려");
    }
  };
  return (
    <Profile>
      <Text>포토카드에 SNS 계정을 연결해서 공유해 보세요.</Text>
      <InstaButton onClick={handleButtonClick}>
        <Icon src="/icons/instagram.png" $isLinked={isLinked} />
        <Text>{isLinked ? "연결해제" : "연결하기"}</Text>
      </InstaButton>
      <MyInfos isLinked={isLinked} infos={infos} />
    </Profile>
  );
};

export default InstaProfile;
