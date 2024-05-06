package com.socialmediaapp.gymapplication.repository;

import com.socialmediaapp.gymapplication.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface UserRepository extends CrudRepository<User, Long> {
    // Add custom methods if needed
}