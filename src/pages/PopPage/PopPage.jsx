import React, { useState } from "react";
import Layout from "../../components/Layout";
import Container from "./components/Container";
import Card from "./components/Card";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { useMatch, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "styled-components";
import { SkeletonPage } from "../SkeletonPage/SkeletonPage";
import PopDetailPage from "../PopDetailPage/PopDetailPage";

const photos = [
  {
    id: 1,
    image: "/sample.png",
    level: 1,
  },
  {
    id: 6,
    image: "/sample2.png",
    level: 2,
  },
  {
    id: 4,
    image: "/sample4.png",
    level: 2,
  },
  {
    id: 17,
    image: "/sample3.png",
    level: 3,
  },
  {
    id: 22,
    image: "/sample5.png",
    level: 1,
  },
  {
    id: 31,
    image: "/sample.png",
    level: 1,
  },
  {
    id: 171,
    image: "/sample3.png",
    level: 3,
  },
  {
    id: 34,
    image: "/sample4.png",
    level: 1,
  },
  {
    id: 92,
    image: "/sample.png",
    level: 3,
  },
  {
    id: 54,
    image: "/sample2.png",
    level: 2,
  },
];

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

const PopPage = () => {
  const navigate = useNavigate();
  const detailMatch = useMatch("/pop/post/:postId");

  const handleCardClick = (postId) => {
    navigate(`post/${postId}`);
  };

  const handleOverlayClick = () => {
    navigate("/pop");
  };

  const clickedId =
    detailMatch?.params.postId &&
    photos.find((photo) => photo.id === +detailMatch?.params.postId);

  return (
    <Layout>
      <Container>
        <MasonryInfiniteGrid gap={8} isConstantSize={true} threshold={300}>
          {photos.map((photo) => {
            return (
              <Card
                layoutId={"pop" + photo.id}
                key={photo.id}
                level={photo.level}
                image={photo.image}
                onClick={() => handleCardClick(photo.id)}
              />
            );
          })}
        </MasonryInfiniteGrid>
      </Container>
      <AnimatePresence>
        {detailMatch && (
          <>
            <Overlay
              onClick={handleOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Detail layoutId={"pop" + detailMatch.params.postId}>
              <PopDetailPage image={clickedId.image} id={clickedId} />
            </Detail>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default PopPage;
