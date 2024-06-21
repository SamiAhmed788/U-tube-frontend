import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice.js';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utits/firbase.js';
import { useNavigate } from 'react-router-dom';
import { url } from '../utils/domain.jsx';

const Container = styled.div`
  width: 400px;
  height: 800px;
  background-color: ${({ theme }) => theme.bg};
  margin: 50px auto;
  border: 0.5px solid ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const Input = styled.input`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bglighter}; 
  margin-top: 30px;
  width: 250px;
  height: 30px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  font-size: 30px;
  margin-left: 150px;
`;

const Headings = styled.div`
  color: ${({ theme }) => theme.text};
  font-weight: 400;
  font-size: 20px;
  margin-left: 90px;
  padding-top: 20px;
`;

const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  font-size: 17px;
  margin-left: 10px;
  margin-top: 30px;
  height: 40px;
`;

const Sign = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`${url}/api/auth/signin`, { name, password }, {
        withCredentials: true,
      });
      console.log("res", res.data);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      // Log user details for debugging
      console.log("Google user:", user);

      // Post user details to your backend API
      const res = await axios.post(`${url}/api/auth/google`, {
        name: user.displayName,
        email: user.email,
        img: user.photoURL,
      });

      // Log API response for debugging
      console.log("API response:", res.data);

      // Dispatch login success and navigate to home
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      // Log error for debugging
      console.error("Error during sign-in:", error);
      dispatch(loginFailure());
    }
  };

  const signHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/auth/signup`, { name, email, password }, {
        withCredentials: true,
      });
      console.log("res", res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container>
      <Title>Sign In</Title>
      <Headings>To continue to Er tube</Headings>
      <Wrapper>
        <Input placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <Input placeholder='Password ' onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={LoginHandler}>Sign In</Button>
        <Title style={{ marginRight: "150px", marginTop: "10px" }}>Or</Title>
        <Button onClick={signInWithGoogle}>Sign Up with Google</Button>
        <Title style={{ marginRight: "150px", marginTop: "10px" }}>Or</Title>
        <Input placeholder='Username' onChange={(e) => setName(e.target.value)} />
        <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={signHandler}>Sign Up</Button>
        <Headings style={{ marginLeft: '0px' }}>English(USA)</Headings>
        <Headings style={{ marginLeft: '0px' }}>Help Privacy Term</Headings>
      </Wrapper>
    </Container>
  );
};

export default Sign;
