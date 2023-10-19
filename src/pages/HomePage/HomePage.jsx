import React, { useRef, useState } from "react";
import Layout from "../../components/Layout";
// import { SkeletonPage } from "../SkeletonPage/SkeletonPage";
import Post from "../../components/Post";
import PostInfos from "../../components/PostInfos";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const posts = [
  {
    id: 1,
    image: "sample.png",
    name: "안녕하세요",
    hashtags: ["대박", "굿", "하이"],
    isLiked: false,
    points: 100,
  },
  {
    id: 5,
    image: "sample2.png",
    name: "나는열글자가되고싶다아",
    hashtags: [],
    isLiked: true,
    points: 100,
  },
  {
    id: 13,
    image: "sample5.png",
    name: "나는열두글자가되고싶다아",
    hashtags: ["해시태그여덟글자", "테스트도여덟글자"],
    isLiked: true,
    points: 100,
  },
  {
    id: 51,
    image: "sample3.png",
    name: "예시4",
    hashtags: ["hastag", "english", "version"],
    isLiked: false,
    points: 100,
  },
  {
    id: 33,
    image: "sample4.png",
    name: "예시5",
    hashtags: ["hello", "spark", "대박"],
    isLiked: true,
    points: 100,
  },
];

const swiperStyle = {
  width: "100%",
  height: "100%",
  position: "relative",
};

const ProgressBar = styled.svg`
  --progress: 0;
  position: absolute;
  bottom: 0;
  z-index: 9;
  width: 100%;
  stroke-width: 1px;
  stroke: ${(props) => props.theme.orange};
  fill: none;
  stroke-dashoffset: calc(100 * (1 - var(--progress)));
  stroke-dasharray: 100;
`;

const VideoController = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgb(15, 15, 15, 0.6);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePage = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const progressBarRef = useRef();
  const pauseAnimation = useAnimation();
  const resumeAnimation = useAnimation();
  let clickTimer = null;

  const handleProgessBarPaint = (s, t, progress) => {
    progressBarRef.current.style.setProperty("--progress", 1 - progress);
  };

  const handleSwiperClick = () => {
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
      return;
    }

    clickTimer = setTimeout(() => {
      if (isPlaying) {
        swiperRef.autoplay.pause();
        pauseAnimation.start({
          scale: [0, 1, 1, 1.2, 1],
          opacity: [0, 1, 1, 1, 0],
        });
      } else {
        swiperRef.autoplay.resume();
        resumeAnimation.start({
          scale: [0, 1, 1, 1.2, 1],
          opacity: [0, 1, 1, 1, 0],
        });
      }
      setIsPlaying((prev) => !prev);
      clickTimer = null;
    }, 200);
  };

  const handleAutoPlayPause = () => {
    swiperRef.autoplay.pause();
    setIsPlaying(false);
  };

  return (
    <Layout>
      <VideoController
        animate={pauseAnimation}
        initial={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
        </svg>
      </VideoController>
      <VideoController
        animate={resumeAnimation}
        initial={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1378 10.5682L9.60498 7.30173C8.40816 6.70332 7 7.57361 7 8.9117V15.0868C7 16.4249 8.40816 17.2952 9.60498 16.6967L16.1378 13.4303C17.3171 12.8407 17.3171 11.1578 16.1378 10.5682Z"
            fill="currentColor"
          />
        </svg>
      </VideoController>
      <Swiper
        style={swiperStyle}
        direction="vertical"
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onAutoplayTimeLeft={handleProgessBarPaint}
        onSwiper={setSwiperRef}
        loop
      >
        {posts.map((post) => {
          return (
            <SwiperSlide key={post.id} onClick={handleSwiperClick}>
              <Post.Home
                image={post.image}
                info={<PostInfos name={post.name} hashtags={post.hashtags} />}
                id={post.id}
                isLikedPost={post.isLiked}
                points={post.points}
                handleAutoPlayPause={handleAutoPlayPause}
              />
            </SwiperSlide>
          );
        })}
        <ProgressBar viewBox="0 0 100 1" ref={progressBarRef}>
          <line x1="0" y1="1" x2="100" y2="1" />
        </ProgressBar>
      </Swiper>
    </Layout>
  );
};

export default HomePage;
