import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ImageUpload.css';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file || !(file instanceof Blob)) {
      console.error('Invalid file:', file);
      return;
    }

    setSelectedFile(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('description', description);

      console.log('FormData:', formData);

      const response = await axios.post('http://localhost:8070/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageId = response.data;
      navigate(`/image/${imageId}`);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError(true);
      setTimeout(() => {
        setUploadError(false);
      }, 3000);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDescription('');
  };

  const isSubmitDisabled = !selectedFile; // Disable submit button if no file is selected

  return (
    <div className="image-upload-container">
      <div className="upload-box">
        <div>
          <h2 className="upload-title">Upload Image</h2>
          <p className="upload-description">
            Upload an image to share with your friends and family.
          </p>
        </div>
        <div className="preview-container">
          {previewUrl && <img src={previewUrl} alt="Preview" className="upload-preview" />}
          {!previewUrl && <div className="initial-preview">Preview Image</div>}
        </div>
        <form onSubmit={handleUpload}>
          <label htmlFor="file-input" className="upload-label">
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              className="file-input"
            />
            <span className="upload-button">Upload Image</span>
          </label>
          <input
            type="text"
            id="description-input"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter image description"
            className="description-input"
          />
          {isSubmitDisabled ? (
            <button type="button" disabled className="submit-button disabled">Submit</button>
          ) : (
            <button type="submit" className="submit-button">Submit</button>
          )}
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </form>
      </div>
      {uploadError && <div className="error-message">Error uploading image. Please try again.</div>}
    </div>
  );
};

export default ImageUpload;
