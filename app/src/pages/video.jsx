import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Card from "../components/card.jsx";
import { dislike, fetchSuccess, like } from '../../redux/videoSlice.js';
import { format } from "timeago.js";
import Comments from '../components/comments.jsx';
import { CircularProgress } from '@mui/material';
import Recommendation from '../components/recommindation.jsx';
import { url } from '../utils/domain.jsx';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textsoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textsoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const currentVideoState = useSelector((state) => state.Video);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  
  const [channel, setChannel] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`${url}/api/videos/find/${path}`, {
          withCredentials: true,
        });
        const channelRes = await axios.get(`${url}/api/users/find/${videoRes.data.userId}`, {
          withCredentials: true,
        });
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `${url}/api/users/like/${currentVideoState.currentVideo._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}` // Replace currentUser.token with your actual token variable
          },
          withCredentials: true // Optional: if your API requires credentials like cookies
        }
      );
      dispatch(like(currentUser._id));
      console.log(response.data); // Debug: log response
    } catch (error) {
      console.error('Error liking the video:', error.response || error.message); // Debug: log error
    }
  };
  
  const handleDislike = async () => {
    try {
      await axios.put(`${url}/api/users/dislike/${currentVideoState.currentVideo._id}`);
      dispatch(dislike(currentUser._id));
    } catch (error) {
      console.error('Error disliking the video:', error.response || error.message); // Debug: log error
    }
  };
  
  const handleSub = async () => {
    try {
      currentUser.subscribedUsers.includes(channel._id)
        ? await axios.put(`${url}/api/users/unsub/${channel._id}`)
        : await axios.put(`${url}/api/users/sub/${channel._id}`);
    } catch (error) {
      console.error('Error subscribing/unsubscribing:', error.response || error.message); // Debug: log error
    }
  };

  if (!currentVideoState || !currentVideoState.currentVideo) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideoState.currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideoState.currentVideo.title}</Title>
        <Details>
          <Info>{currentVideoState.currentVideo.views} views • {format(currentVideoState.currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideoState.currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUpOutlinedIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideoState.currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideoState.currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownOffAltOutlinedIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img || "https://th.bing.com/th/id/OIP.5XztPIv_1Jvj802FU_4BXQHaHa?w=199&h=199&c=7&r=0&o=5&dpr=1.1&pid=1.7"} alt={channel.name} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers ? channel.subscribers : "0"} subscribers</ChannelCounter>
              <Description>{currentVideoState.currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>

          <Subscribe onClick={handleSub}> 
            {currentUser?.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideoState?.currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideoState.currentVideo.tags} />
    </Container>
  );
};

export default Video;
