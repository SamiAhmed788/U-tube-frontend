import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./card.jsx";
import { url } from "../utils/domain.jsx";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${url}/api/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((vid) => (
        <Card type="sm" key={vid._id} vid={vid} />
      ))}
    </Container>
  );
};

export default Recommendation;
