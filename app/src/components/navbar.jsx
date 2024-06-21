import { AccountCircleOutlined, SearchOutlined, VideoCallOutlined } from '@mui/icons-material';
import React, { useState } from 'react'
import styled from 'styled-components';
import { Upload } from './uplaod';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

const Container = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.text};
  font-style: 14px;
  position: sticky;
  top:0;
`;

const Wrapper = styled.div`
  background-color:${({ theme }) => theme.bglighter}; ;
display: flex;
height: 100%;
justify-content: flex-end;
padding: 0 20px;
position: relative;

`;
const Logo = styled.div`

`;
const Search = styled.div`
width: 40%;
left: 0px;
right: 0px;
margin: auto;
display: flex;
position: absolute;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 5px;
margin-top: 10px;
`;
const Input = styled.input`
color: ${({ theme }) => theme.text} ;
outline: none;
border: none;
width: 90%;
background-color: ${({ theme }) => theme.bglighter}; ;
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


const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;




export default function Navbar() {
  const navigate = useNavigate()
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
const [open, setopen] = useState(false);

  return (
    <>
       <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlined onClick={()=>navigate(`/search?q=${q}`)
        }/>
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlined onClick={() => setopen(true)} />
              <Avatar src={currentUser.img} />
              {currentUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlined />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setopen} />}          </>
  )
}
