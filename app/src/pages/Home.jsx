import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/card';
import axios from "axios";
import { url } from '../utils/domain';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function Homee({ type }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/videos/${type}`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <Container>
      {videos.map((vid) => (
        <Card key={vid.id} vid={vid} />
      ))}
    </Container>
  );
}

export default Homee;
