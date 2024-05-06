package com.socialmediaapp.gymapplication.repository;

import com.socialmediaapp.gymapplication.model.Image;
import com.socialmediaapp.gymapplication.model.LikeDislike;
import com.socialmediaapp.gymapplication.model.User;
import org.springframework.data.repository.CrudRepository;

public interface LikeDislikeRepository extends CrudRepository<LikeDislike, Long> {
    // Add custom methods if needed
    LikeDislike findByImageAndUser(Image image, User user);
}