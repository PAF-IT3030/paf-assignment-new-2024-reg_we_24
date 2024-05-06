import React from 'react';
import './App.css';
import ImageUpload from './components/imageUpload/ImageUpload';
import ImageView from './components/imageView/ImageView'; // Import ImageView component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageUpload />} />
        <Route path="/image/:id" element={<ImageView />} /> {/* Route to ImageView component */}
      </Routes>
    </Router>
  );
};

export default App;


