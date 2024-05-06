import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link to navigate to individual image views

import './ImageView.css';

const ImageView = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesResponse = await axios.get('http://localhost:8070/all-images');
        setImages(imagesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="images-container">
      {images.map(image => (
        <div key={image.id} className="image-card">
          <Link to={`/image/${image.id}`}>
            <img src={`http://localhost:8070/display?id=${image.id}`} alt="Uploaded" className="uploaded-image" />
          </Link>
          <p className='postcap'>{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageView;
