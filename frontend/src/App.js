import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import ImageGeneration from './components/ImageGeneration'; // This is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/generate" element={<ImageGeneration />} />
        <Route path="/image-generator" element={<ImageGeneration />} /> {/* Fixed here */}
      </Routes>
    </Router>
  );
};

export default App;
