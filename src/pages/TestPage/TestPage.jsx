import React from "react";
import Layout from "../../components/Layout";
import ToUploadPage from "../UploadPage/ToUploadPage";
import Button from "../UploadPage/components/Button";
import styled from "styled-components";

const DownloadButton = styled.button`
  width: 44px;
  height: 44px;
  background-color: ${(props) => props.theme.white};
  border-radius: 8px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestPage = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          gap: "4px",
          flexDirection: "column",
          width: "342px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <DownloadButton>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44771 11 5L13 5ZM6.29289 9.70711L11.2929 14.7071L12.7071 13.2929L7.70711 8.29289L6.29289 9.70711ZM12.7071 14.7071L17.7071 9.70711L16.2929 8.29289L11.2929 13.2929L12.7071 14.7071ZM13 14L13 5L11 5L11 14L13 14Z"
                fill="#202124"
              />
              <path
                d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                stroke="#202124"
                strokeWidth="2"
              />
            </svg>
          </DownloadButton>
          <Button
            width="290px"
            text="축팅 업로드"
            iconSrc="/icons/fireworks.png"
          />
        </div>
        <Button text="아니요, 안 할래요!" isReversed />
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          gap: "8px",
          width: "302px",
          margin: "0 auto",
        }}
      >
        <Button
          text="스토리 공유하기"
          width="214px"
          iconSrc="/icons/instagram.png"
        />
        <Button text="확인" width="80px" />
      </div>
    </Layout>
  );
};

export default TestPage;
