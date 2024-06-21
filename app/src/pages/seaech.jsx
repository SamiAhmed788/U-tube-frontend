import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/card";
import { url } from "../utils/domain";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${url}/api/videos/search${query}`);
      console.log(res.data);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return <Container>
    {videos.map(vid=>(
      <Card key={vid?._id} vid={vid}/>
    ))}
  </Container>;
};

export default Search;
