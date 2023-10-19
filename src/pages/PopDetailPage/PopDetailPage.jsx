import React, { useState } from "react";
import Post from "../../components/Post";
import PostInfos from "../../components/PostInfos";
import SkeletonInfos from "../SkeletonPage/components/SkeletonInfos";

const photo = {
  id: 1,
  image: "/sample.png",
  name: "대박사건",
  hashtags: ["하이", "안녕"],
  likes: 49,
  points: 200,
  isLiked: false,
};

const PopDetailPage = ({ image, id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getPost = (id) => {
    console.log("리액트 쿼리로 id값 사용");
  };

  return (
    <Post.Pop
      isLoading={isLoading}
      image={image}
      info={
        isLoading ? (
          <SkeletonInfos />
        ) : (
          <PostInfos name={photo.name} hashtags={photo.hashtags} />
        )
      }
      id={photo.id}
      isLikedPost={photo.isLiked}
      numberLikes={photo.likes}
      points={photo.points}
    />
  );
};

export default PopDetailPage;
