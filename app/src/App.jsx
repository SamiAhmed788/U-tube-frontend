import React, { useState } from 'react';
import './App.css';
import Menu from './components/menu.jsx';
import Navbar from './components/navbar.jsx';
import styled, { ThemeProvider } from 'styled-components';
import { Darktheme, Lighttheme } from './utits/theme.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Video from './pages/video.jsx';
import Homee from './pages/Home.jsx';
import Sign from './pages/sign.jsx';
import  axios from 'axios';
import Search from './pages/seaech.jsx';

axios.defaults.withCredentials = true; // Set globally for all requests

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

export const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

function App() {
  const [darkmode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkmode ? Darktheme : Lighttheme}>
      <Container>
        <Router>
          <Menu darkmode={darkmode} setdarkmode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/" element={<Homee key={Date.now()} type="random" />} />
                <Route path="/trend" element={<Homee key={Date.now()} type="trend" />} />
                <Route path="/subscription" element={<Homee key={Date.now()} type="sub" />} />
                <Route path="search" element={<Search />} />
                <Route path="videos/:id" element={<Video />} />
                <Route path="/signin" element={<Sign />} />
                <Route path="*" element={<div>Page Not Found</div>} /> {/* Optional: catch-all route */}
              </Routes>
            </Wrapper>
          </Main>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
