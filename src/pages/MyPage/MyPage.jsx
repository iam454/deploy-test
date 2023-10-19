import React from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import UploadButton from "./components/UploadButton";
import KaKaoProfile from "./components/KaKaoProfile";
import InstaProfile from "./components/InstaProfile";
import Card from "./components/Card";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import MyDetailPage from "../MyDetailpage/MyDetailPage";

const response = {
  id: 14,
  username: "춘식이",
  email: "chooonsik@naver.com",
  profileImage: "sample.png",
  instagram: {
    isLinked: true,
    infos: {
      totalLikes: 54,
      totalViews: 48,
      fireworks: 700,
    },
    photos: [
      {
        id: 4,
        image: "/sample.png",
        createdAt: "2023-09-02",
        name: "안녕하세요",
        hashtags: ["해쉬태그", "안녕"],
        likes: 50,
        instaViews: 39,
        isLiked: true,
      },
      {
        id: 19,
        image: "/sample3.png",
        createdAt: "2023-10-17",
        name: "열두글자이름이름열두글자",
        hashtags: ["여덟글자해쉬태그", "안녕안녕"],
        likes: 4,
        instaViews: 0,
        isLiked: true,
      },
      {
        id: 21,
        image: "/sample4.png",
        createdAt: "2023-11-02",
        name: "english Name",
        hashtags: ["english"],
        likes: 0,
        instaViews: 9,
        isLiked: false,
      },
    ],
  },
};

const response2 = {
  id: 14,
  username: "춘식이",
  email: "chooonsik@naver.com",
  profileImage: "/icons/accountIcon.png",
  instagram: {
    isLinked: false,
    infos: {},
    photos: [],
  },
};

const response3 = {
  id: 14,
  username: "춘식이",
  email: "chooonsik@naver.com",
  profileImage: "/icons/accountIcon.png",
  instagram: {
    isLinked: true,
    infos: {
      totalLikes: 0,
      totalViews: 0,
      fireworks: 300,
    },
    photos: [],
  },
};

const Container = styled.div`
  width: 358px;
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
`;

const Album = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  width: 390px;
  height: 100%;
  background-color: ${(props) => props.theme.modal.dim};
  opacity: 0;
`;

const Detail = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 57px;
  left: 0;
  right: 0;
  margin: auto;
  width: 374px;
  height: 80vh;
  height: 80dvh;
  border-radius: 8px;
  background-color: rgb(15, 15, 15);
  overflow: hidden;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const MyPage = () => {
  const {
    username,
    email,
    profileImage,
    instagram: { isLinked, infos, photos },
  } = response2;
  const navigate = useNavigate();
  const detailMatch = useMatch("/profile/post/:postId");

  const handleCardClick = (postId) => {
    navigate(`post/${postId}`);
  };

  const handleOverlayClick = () => {
    navigate("/profile");
  };

  const clickedPhoto =
    detailMatch?.params.postId &&
    photos.find((photo) => photo.id === +detailMatch?.params.postId);

  return (
    <Layout>
      <Container>
        <KaKaoProfile
          username={username}
          email={email}
          profileImage={profileImage}
        />
        <InstaProfile isLinked={isLinked} infos={infos} />
        <UploadButton isLinked={isLinked} />
        <Album>
          {photos.map((photo) => {
            return (
              <Card
                key={photo.id}
                photo={photo}
                layoutId={"my" + photo.id}
                onClick={() => handleCardClick(photo.id)}
              />
            );
          })}
        </Album>
      </Container>
      <AnimatePresence>
        {detailMatch && (
          <>
            <Overlay
              onClick={handleOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Detail layoutId={"my" + detailMatch.params.postId}>
              <MyDetailPage photo={clickedPhoto} />
            </Detail>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default MyPage;
