package com.socialmediaapp.gymapplication.service;

import com.socialmediaapp.gymapplication.model.Comment;

import java.util.List;

public interface CommentService {
    Comment addComment(Long postId, String content);
    List<Comment> getCommentsForPost(Long postId);
    void deleteComment(Long commentId); // New method for deleting a comment
    void editComment(Long commentId, String newContent);
    // Other methods as needed
}
