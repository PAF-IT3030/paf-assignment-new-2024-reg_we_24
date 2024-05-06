package com.socialmediaapp.gymapplication.service;

import com.socialmediaapp.gymapplication.model.Comment;
import com.socialmediaapp.gymapplication.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment addComment(Long postId, String content) {
        // Create a new comment instance
        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());

        // Save the comment to the database
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsForPost(Long postId) {
        // Retrieve comments for a specific post
        return commentRepository.findByPostId(postId);
    }

    @Override
    public void deleteComment(Long commentId) {
        // Delete a comment by its ID
        commentRepository.deleteById(commentId);
    }

    // Other methods as needed

    @Override
    public void editComment(Long commentId, String newContent) {
        // Fetch the comment from the database by ID
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        optionalComment.ifPresent(comment -> {
            // Update the content of the comment
            comment.setContent(newContent);
            // Save the updated comment
            commentRepository.save(comment);
        });
    }
}