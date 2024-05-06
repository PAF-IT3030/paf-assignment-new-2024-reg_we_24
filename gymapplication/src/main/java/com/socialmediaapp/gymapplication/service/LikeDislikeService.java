package com.socialmediaapp.gymapplication.service;

import com.socialmediaapp.gymapplication.model.LikeDislike;

public interface LikeDislikeService {
    LikeDislike likeDislikeImage(Long imageId, Long userId, boolean liked);
}