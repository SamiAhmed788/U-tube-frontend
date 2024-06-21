import React from 'react';
import styled from 'styled-components';
import ertube from '/src/assets/you_tube-removebg-preview (1).png'
import { Home, HomeMax, PlayCircleFilledOutlined, SwitchAccount,SubscriptionsRounded, VideoCameraFront, VideoFileOutlined, History, PlaylistPlay, Slideshow, WatchLater, ThumbsUpDown, ThumbUpSharp, ContentCut, Explore, MusicVideo, GamesOutlined, Newspaper, Sports, Contrast, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const Container = styled.div`
  flex: 1;
  background-color:${({ theme }) => theme.bglighter}; ;
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-style: 14px;
  position: sticky;
  top:0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
display: flex;
align-items: center;
gap: 5px;
font-weight: bold;
margin-bottom: 25px;
color: ${({ theme }) => theme.text} ;

`;
const IMG = styled.img`
height: 25px;
`;
const HR = styled.hr`
margin: 15px 0;
border: 0.5px solid ${({ theme }) => theme.soft};;
color:#292828 ;
`;
const Item = styled.div`
display:flex;
align-items:center;
gap:20px;
cursor: pointer;
padding: 7.5px 0px;
color: ${({ theme }) => theme.text} ;
`;

const Login = styled.div`
font-size: 11px;
`;

const Title = styled.h2`
font-style: 14px;
font-weight: 500;
color: ${({ theme }) => theme.textsoft};
margin-bottom: 20px;
`;

const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #008fe8 ;
color:#008fe8;
font-weight: 500;
margin-top: 10px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
`;
function Menu({darkmode , setdarkmode}) {
  return (
   <Container>
   <Wrapper>
   <Link to="/" style={{ textDecoration: "none"}}>
   <Logo>   
    <IMG src={ertube}/>
    ER TUBE

   </Logo>
   </Link>
   <Link to="/" style={{ textDecoration: "none" }}>
   <Item>

    <Home/>
    Home
   </Item>
   </Link>
   <Link to="/trend" style={{ textDecoration: "none" }}>
   <Item>
    <PlayCircleFilledOutlined/>
    Trend
   </Item>
   </Link>
   <Link to="/subcription" style={{ textDecoration: "none" }}>
   <Item>
    <SubscriptionsRounded/>
    Subscriptions
   </Item>
   </Link>
   <HR/>
<Login>
Sign in to like video, and comment and subscribe.
</Login>
<Button><AccountCircle/>  sign in</Button>
<HR/>
<Title>You</Title>
   <Item>
    <SwitchAccount/>
    Your Channel
   </Item>
   <Item>
    <History/>
    history
   </Item>
   <Item>
    <PlaylistPlay/>
    Playlist
   </Item>
   <Item>
    <Slideshow/>
    Your Video
   </Item>
   <Item>
    <WatchLater/>
    Watch later
   </Item>
   <Item onClick={()=>setdarkmode(!darkmode)}>
    <Contrast/>
{darkmode ? "light mode" : "dark mode" }
   </Item>
   <Item>
    <ContentCut/>
    Your Clip
   </Item>
   <HR/>
   <Title>Explore</Title>
   <Item>
    <Explore/>
    Explore
   </Item>
   <Item>
    <MusicVideo/>
    music
   </Item>
   <Item>
    <GamesOutlined/>
    gaming
   </Item>
   <Item>
    <Newspaper/>
    news
   </Item>
    <Item>
    <Sports/>
sports
   </Item>
   </Wrapper>
   </Container>
  );
}

export default Menu;
