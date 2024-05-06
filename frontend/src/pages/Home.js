import React from 'react';
import bg from '../assets/bg.jpg';

export default function Home() {
  return (
    <div>
      <img 
        src={bg} 
        alt="Background" 
        style={{
          width: '100%',
          height: '100vh',
          objectFit: 'cover'
        }}
      />
    </div>
  );
}
