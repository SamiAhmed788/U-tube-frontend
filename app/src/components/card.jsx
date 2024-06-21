import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { url } from "../utils/domain";

// Styled components remain unchanged...
const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  margin-top:16px;
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: none;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textsoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textsoft};
`;

function Card({ type, vid }) {
  const [Channelname, setChannelname] = useState(null); // Initialize as null
  const { currentUser } = useSelector((state) => state.user);

  const fetchChannel = async () => {
    if (!vid?.userId) return; // Early return if userId is not available
    const res = await axios.get(`${url}/api/users/find/${vid?.userId}`);
    setChannelname(res.data)
  };

  useEffect(() => {
    fetchChannel();
  }, [vid]); // Dependency array includes vid to refetch on changes

  if (!Channelname) {
    // Render a loading indicator or nothing until Channelname is set
    return null; // Or return a loading spinner
  }

  return (
    <Link to={`/videos/${vid._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={vid?.imgUrl} />
        <Details type={type}>
          {type!== "sm" && (
            <ChannelImage type={type} src={Channelname?.img} /> // Use Channelname's img
          )}
          <Texts>
            <Title>{vid?.title}</Title>
            <ChannelName>{Channelname?.name}</ChannelName>
            <Info>
              {vid.views} views • {format(vid.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
