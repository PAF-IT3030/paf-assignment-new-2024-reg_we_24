import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './ImageView.css';

const ImageView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState(null);
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [liked, setLiked] = useState(false); // State to track liking status
  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(''); // State for adding new comment
  const [postDeleted, setPostDeleted] = useState(false); // State to track post deletion
  

  useEffect(() => {
    const getImage = async () => {
      try {
        const imageResponse = await axios.get(`http://localhost:8070/display?id=${id}`, {
          responseType: 'arraybuffer',
        });
        const imageBlob = new Blob([imageResponse.data], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageData(imageUrl);

        const descriptionResponse = await axios.get(`http://localhost:8070/description?id=${id}`);
        setDescription(descriptionResponse.data);

        // Fetch comments for the image
        const commentsResponse = await axios.get(`http://localhost:8070/comments?id=${id}`);
        setComments(commentsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching image:', error);
        setLoading(false);
      }
    };

    getImage();
  }, [id]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedDescription(description);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:8070/update-description?id=${id}`, {
        description: editedDescription,
      });
      setDescription(editedDescription);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:8070/delete-post/${id}`);
        alert('Post deleted successfully');
        setPostDeleted(true);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleLikeDislike = async (liked) => {
    try {
      await axios.post(`http://localhost:8070/like-dislike?id=${id}&liked=${liked}`);
      setLiked(liked);
    } catch (error) {
      console.error('Error liking/disliking post:', error);
    }
  };

  //set comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(`http://localhost:8070/comments?id=${id}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
  }, [id]);


  //edit comments
  const handleEditComment = async (commentId, content) => {
    try {
      await axios.put(`http://localhost:8070/edit-comment/${commentId}`, { content });
      // Optionally, update the comments list or show a success message
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  //delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8070/delete-comment/${commentId}`);
      // Remove the deleted comment from the comments list
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  
  const handleAddComment = async () => {
    try {
      await axios.post(`http://localhost:8070/add-comment?id=${id}&content=${newComment}`);
      setNewComment('');
      const commentsResponse = await axios.get(`http://localhost:8070/comments?id=${id}`);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (postDeleted) {
    return null;
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <span className="post-username">Username</span>
        <div className="ellipsis" onClick={handleEditClick}>Edit</div>
        <div className="ellipsis" onClick={handleDeleteClick}>Delete Post</div>
      </div>

      <div>
      <p className='postcap'>{description}</p>
      </div>
      <div className="post-image">
        <img src={imageData} alt="Uploaded" className="uploaded-image" />
      </div>
      <div className="post-actions">
        <button onClick={() => handleLikeDislike(!liked)}>
          {liked ? 'Unlike' : 'Like'}
        </button>
      </div>
      <div className="post-caption">
        
        {editMode ? (
          <div className="edit-mode-controls">
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <div>
          <p>Comments:</p>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                {comment.content}
                <button  className = "editebtn"onClick={() => handleEditComment(comment.id, 'Updated content')}>Edit</button>
                <button  className = "deletbtn"onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="add-comment">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageView;
