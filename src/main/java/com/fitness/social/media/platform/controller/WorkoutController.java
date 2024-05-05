package com.fitness.social.media.platform.controller;

import com.fitness.social.media.platform.model.Workoutinputs;
import com.fitness.social.media.platform.repository.UserRepository;
import com.fitness.social.media.platform.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")

public class WorkoutController {

    @Autowired
    private WorkoutRepository workoutRepository;

    @PostMapping("/workout")
    Workoutinputs newWorkoutinputs(@RequestBody Workoutinputs newWorkoutinputs){return workoutRepository.save(newWorkoutinputs);
    }

    @GetMapping("/get")
    List<Workoutinputs>getAllWorkout(){return workoutRepository.findAll();}

}
