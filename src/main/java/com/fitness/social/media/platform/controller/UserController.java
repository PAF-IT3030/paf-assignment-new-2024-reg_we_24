package com.fitness.social.media.platform.controller;

import com.fitness.social.media.platform.model.User;
import com.fitness.social.media.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser){return  userRepository.save(newUser);
    }

    @GetMapping("/")
    List<User>getAllUsers(){
        return userRepository.findAll();
    }
}
