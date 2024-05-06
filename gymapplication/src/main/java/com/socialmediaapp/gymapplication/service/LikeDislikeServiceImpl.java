package com.socialmediaapp.gymapplication.service;

import com.socialmediaapp.gymapplication.model.Image;
import com.socialmediaapp.gymapplication.model.LikeDislike;
import com.socialmediaapp.gymapplication.model.User;
import com.socialmediaapp.gymapplication.repository.ImageRepository;
import com.socialmediaapp.gymapplication.repository.LikeDislikeRepository;
import com.socialmediaapp.gymapplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeDislikeServiceImpl implements LikeDislikeService {

    @Autowired
    private LikeDislikeRepository likeDislikeRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public LikeDislike likeDislikeImage(Long imageId, Long userId, boolean liked) {
        // Get the image and user based on their IDs
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new IllegalArgumentException("Image not found with ID: " + imageId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // Check if the user has already liked/disliked the image
        LikeDislike existingLike = likeDislikeRepository.findByImageAndUser(image, user);

        if (existingLike != null) {
            // User already liked/disliked, update the existing entry
            existingLike.setLiked(liked);
            return likeDislikeRepository.save(existingLike);
        } else {
            // User hasn't liked/disliked before, create a new entry
            LikeDislike likeDislike = new LikeDislike(image, user, liked);
            return likeDislikeRepository.save(likeDislike);
        }
    }
}