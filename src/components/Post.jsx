import React, { useState } from "react";
import { styled } from "styled-components";
import IconButton from "./IconButton";
import { motion, useAnimation } from "framer-motion";
import { Modal } from "./Modal";
import ModalButton from "./ModalButton";
import theme from "../theme";
import SkeletonIcon from "../pages/SkeletonPage/components/SkeletonIcon";

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  background-color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  position: absolute;
  left: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  z-index: 9;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 9;
`;

const BasePost = ({ image, info, children }) => {
  return (
    <Layout>
      {image && <Image src={image} alt="네컷 사진" />}
      <InfoContainer>{info}</InfoContainer>
      {children && <ButtonContainer>{children}</ButtonContainer>}
    </Layout>
  );
};

const HomePost = ({
  id,
  image,
  info,
  isLikedPost,
  points,
  handleAutoPlayPause,
}) => {
  const [toggleLikeOn, setToggleLikeOn] = useState(isLikedPost);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const likeAnimation = useAnimation();
  const dbclickAnimation = useAnimation();

  const updateLike = (id, state) => {
    console.log("업데이트 요청 API, id값은 ", id);
    console.log("좋아요 요청", state);
  };

  const handleDoubleClick = (id) => {
    if (!toggleLikeOn) {
      likeAnimation.start({
        fill: "rgba(254, 32, 32, 1)",
        stroke: "rgba(254, 32, 32, 1)",
        scale: [1, 1.2, 1],
      });
      updateLike(id, true);
    }
    dbclickAnimation.start({
      fill: "rgba(254, 32, 32, 1)",
      stroke: "rgba(254, 32, 32, 1)",
      scale: [1, 1.2, 1],
      opacity: [1, 1, 0],
    });
    setToggleLikeOn(true);
  };

  const handleLikeButtonClick = () => {
    if (toggleLikeOn) {
      likeAnimation.start({
        fill: "rgba(254, 32, 32, 0)",
        stroke: "rgba(245, 245, 245, 1)",
      });
      updateLike(id, false);
    } else {
      likeAnimation.start({
        fill: "rgba(254, 32, 32, 1)",
        stroke: "rgba(254, 32, 32, 1)",
        scale: [1, 1.2, 1],
      });
      dbclickAnimation.start({
        fill: "rgba(254, 32, 32, 1)",
        stroke: "rgba(254, 32, 32, 1)",
        scale: [1, 1.2, 1],
        opacity: [1, 1, 0],
      });
      updateLike(id, true);
    }
    setToggleLikeOn((prev) => !prev);
  };

  const handleInstaButtonClick = (id, points) => {
    console.log("폭죽 보낼 아이디: ", id);
    console.log(points, "폭죽 소모");
    handleAutoPlayPause();
    setIsModalOpen(true);
  };

  return (
    <Layout
      onDoubleClick={(e) => {
        e.stopPropagation();
        handleDoubleClick(id);
      }}
    >
      <Image src={image} alt="네컷 사진" />
      <InfoContainer>{info}</InfoContainer>
      <motion.svg
        width={48}
        height={48}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.path
          d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
          animate={dbclickAnimation}
          strokeWidth="2"
        />
      </motion.svg>
      <ButtonContainer>
        <IconButton onClick={handleLikeButtonClick}>
          <motion.svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <motion.path
              d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
              initial={{
                stroke: toggleLikeOn
                  ? "rgba(254, 32, 32, 1)"
                  : "rgba(245, 245, 245, 1)",
                fill: toggleLikeOn
                  ? "rgba(254, 32, 32, 1)"
                  : "rgba(245, 245, 245, 0)",
              }}
              animate={likeAnimation}
              strokeWidth="2"
            />
          </motion.svg>
        </IconButton>
        <IconButton onClick={() => handleInstaButtonClick(id, points)}>
          <img
            src="/icons/instagram.png"
            width={20}
            height={20}
            alt="인스타그램"
          />
        </IconButton>
        <Modal.Long
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          text1="폭죽을 사용하여"
          text2="인스타그램 계정에 방문할 수 있어요!"
        >
          <ModalButton
            isLong
            onClick={() => {
              console.log("인스타그램 방문!");
            }}
            iconSrc="/icons/instagram.png"
            bgColor={theme.pink}
            text="인스타그램 방문하기"
          />
        </Modal.Long>
      </ButtonContainer>
    </Layout>
  );
};

const PopPost = ({
  id,
  image,
  info,
  isLikedPost,
  numberLikes,
  points,
  isLoading,
}) => {
  const [toggleLikeOn, setToggleLikeOn] = useState(isLikedPost);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState(numberLikes);
  const likeAnimation = useAnimation();
  const dbclickAnimation = useAnimation();

  const updateLike = (id, state) => {
    console.log("업데이트 요청 API, id값은 ", id);
    console.log("좋아요 요청", state);
  };

  const handleDoubleClick = (id) => {
    if (!toggleLikeOn) {
      likeAnimation.start({
        fill: "rgba(254, 32, 32, 1)",
        stroke: "rgba(254, 32, 32, 1)",
        scale: [1, 1.2, 1],
      });
      setLikes((prev) => prev + 1);
      updateLike(id, true);
    }
    dbclickAnimation.start({
      fill: "rgba(254, 32, 32, 1)",
      stroke: "rgba(254, 32, 32, 1)",
      scale: [1, 1.2, 1],
      opacity: [1, 1, 0],
    });
    setToggleLikeOn(true);
  };

  const handleLikeButtonClick = () => {
    if (toggleLikeOn) {
      likeAnimation.start({
        fill: "rgba(254, 32, 32, 0)",
        stroke: "rgba(245, 245, 245, 1)",
      });
      setLikes((prev) => prev - 1);
      updateLike(id, false);
    } else {
      likeAnimation.start({
        fill: "rgba(254, 32, 32, 1)",
        stroke: "rgba(254, 32, 32, 1)",
        scale: [1, 1.2, 1],
      });
      dbclickAnimation.start({
        fill: "rgba(254, 32, 32, 1)",
        stroke: "rgba(254, 32, 32, 1)",
        scale: [1, 1.2, 1],
        opacity: [1, 1, 0],
      });
      setLikes((prev) => prev + 1);
      updateLike(id, true);
    }
    setToggleLikeOn((prev) => !prev);
  };

  return (
    <Layout onDoubleClick={() => handleDoubleClick(id)}>
      <Image src={image} alt="네컷 사진" />
      <InfoContainer>{info}</InfoContainer>
      <motion.svg
        width={48}
        height={48}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.path
          d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
          animate={dbclickAnimation}
          strokeWidth="2"
        />
      </motion.svg>
      <ButtonContainer>
        {isLoading ? (
          <>
            <SkeletonIcon hasText />
            <SkeletonIcon />
          </>
        ) : (
          <>
            <IconButton onClick={handleLikeButtonClick} text={likes}>
              <motion.svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <motion.path
                  d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
                  initial={{
                    stroke: toggleLikeOn
                      ? "rgba(254, 32, 32, 1)"
                      : "rgba(245, 245, 245, 1)",
                    fill: toggleLikeOn
                      ? "rgba(254, 32, 32, 1)"
                      : "rgba(245, 245, 245, 0)",
                  }}
                  animate={likeAnimation}
                  strokeWidth="2"
                />
              </motion.svg>
            </IconButton>
            <IconButton
              onClick={() => {
                console.log("폭죽 보낼 아이디: ", id);
                console.log(points, "폭죽 소모");
                setIsModalOpen(true);
              }}
            >
              <img
                src="/icons/instagram.png"
                width={20}
                height={20}
                alt="인스타그램"
              />
            </IconButton>
            <Modal.Long
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              text1="폭죽을 사용하여"
              text2="인스타그램 계정에 방문할 수 있어요!"
            >
              <ModalButton
                isLong
                onClick={() => {
                  console.log("인스타그램 방문!");
                }}
                iconSrc="/icons/instagram.png"
                bgColor={theme.pink}
                text="인스타그램 방문하기"
              />
            </Modal.Long>
          </>
        )}
      </ButtonContainer>
    </Layout>
  );
};

const MyPost = ({
  id,
  image,
  info,
  isLikedPost,
  numberLikes,
  numberInstas,
  isLoading,
}) => {
  const [toggleLikeOn, setToggleLikeOn] = useState(isLikedPost);
  const [likes, setLikes] = useState(numberLikes);
  const likeAnimation = useAnimation();
  const dbclickAnimation = useAnimation();

  const updateLike = (id, state) => {
    console.log("업데이트 요청 API, id값은 ", id);
    console.log("좋아요 요청", state);
  };

  const handleDoubleClick = (id) => {
    if (!toggleLikeOn) {
      likeAnimation.start({
        fill: "rgba(254, 32, 32, 1)",
        stroke: "rgba(254, 32, 32, 1)",
        scale: [1, 1.2, 1],
      });
      setLikes((prev) => prev + 1);
      updateLike(id, true);
    }
    dbclickAnimation.start({
      fill: "rgba(254, 32, 32, 1)",
      stroke: "rgba(254, 32, 32, 1)",
      scale: [1, 1.2, 1],
      opacity: [1, 1, 0],
    });
    setToggleLikeOn(true);
  };

  const handleLikeButtonClick = () => {
    if (toggleLikeOn) {
      likeAnimation.start({
        fill: "rgba(254, 32, 32, 0)",
        stroke: "rgba(245, 245, 245, 1)",
      });
      setLikes((prev) => prev - 1);
      updateLike(id, false);
    } else {
      likeAnimation.start({
        fill: "rgba(254, 32, 32, 1)",
        stroke: "rgba(254, 32, 32, 1)",
        scale: [1, 1.2, 1],
      });
      dbclickAnimation.start({
        fill: "rgba(254, 32, 32, 1)",
        stroke: "rgba(254, 32, 32, 1)",
        scale: [1, 1.2, 1],
        opacity: [1, 1, 0],
      });
      setLikes((prev) => prev + 1);
      updateLike(id, true);
    }
    setToggleLikeOn((prev) => !prev);
  };

  return (
    <Layout onDoubleClick={() => handleDoubleClick(id)}>
      <Image src={image} alt="네컷 사진" />
      <InfoContainer>{info}</InfoContainer>
      <motion.svg
        width={48}
        height={48}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.path
          d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
          animate={dbclickAnimation}
          strokeWidth="2"
        />
      </motion.svg>
      <ButtonContainer>
        {isLoading ? (
          <>
            <SkeletonIcon hasText />
            <SkeletonIcon hasText />
            <SkeletonIcon />
          </>
        ) : (
          <>
            <IconButton onClick={handleLikeButtonClick} text={likes}>
              <motion.svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <motion.path
                  d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
                  initial={{
                    stroke: toggleLikeOn
                      ? "rgba(254, 32, 32, 1)"
                      : "rgba(245, 245, 245, 1)",
                    fill: toggleLikeOn
                      ? "rgba(254, 32, 32, 1)"
                      : "rgba(245, 245, 245, 0)",
                  }}
                  animate={likeAnimation}
                  strokeWidth="2"
                />
              </motion.svg>
            </IconButton>
            <IconButton
              onClick={() => {
                console.log("클릭 이벤트가 필요 없을 듯?");
              }}
              text={numberInstas}
            >
              <img
                src="/icons/instagram.png"
                width={20}
                height={20}
                alt="인스타그램"
              />
            </IconButton>
            <IconButton
              onClick={() => {
                console.log("다운로드 이벤트 발생");
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44771 11 5L13 5ZM6.29289 9.70711L11.2929 14.7071L12.7071 13.2929L7.70711 8.29289L6.29289 9.70711ZM12.7071 14.7071L17.7071 9.70711L16.2929 8.29289L11.2929 13.2929L12.7071 14.7071ZM13 14L13 5L11 5L11 14L13 14Z"
                  fill="currentColor"
                />
                <path
                  d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </IconButton>
          </>
        )}
      </ButtonContainer>
    </Layout>
  );
};

export const Post = Object.assign(BasePost, {
  Home: HomePost,
  Pop: PopPost,
  My: MyPost,
});

export default Post;
