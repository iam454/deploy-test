import React from "react";
import Post from "../../components/Post";
import PostInfos from "../../components/PostInfos";

const MyDetailPage = ({ photo }) => {
  return (
    <Post.My
      id={photo.id}
      image={photo.image}
      info={<PostInfos name={photo.name} hashtags={photo.hashtags} />}
      isLikedPost={photo.isLiked}
      numberLikes={photo.likes}
      numberInstas={photo.instaViews}
    />
  );
};

export default MyDetailPage;
