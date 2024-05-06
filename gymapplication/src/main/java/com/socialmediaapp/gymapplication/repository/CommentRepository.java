package com.socialmediaapp.gymapplication.repository;

import com.socialmediaapp.gymapplication.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Interface declaration: CommentRepository extends JpaRepository<Comment, Long>, which means it inherits CRUD operations for Comment entities
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Method declaration: findByPostId(Long postId) - Custom query method to find comments by post ID
    List<Comment> findByPostId(Long postId);
}