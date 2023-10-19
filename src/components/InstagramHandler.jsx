import React from "react";
import Layout from "./Layout";
import styled from "styled-components";
import HeartLoader from "./HeartLoader";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const InstagramHandler = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  return (
    <Layout>
      <Container>
        <HeartLoader />
      </Container>
    </Layout>
  );
};

export default InstagramHandler;
