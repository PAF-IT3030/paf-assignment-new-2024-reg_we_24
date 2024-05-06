package com.fitness.social.media.platform.controller;

import com.fitness.social.media.platform.exception.WorkoutFoundException;
import com.fitness.social.media.platform.model.Workout;
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
    Workout newWorkout(@RequestBody Workout newWorkout){return workoutRepository.save(newWorkout);
    }

    @GetMapping("/workouts")
    List<Workout>getAllWorkout(){return workoutRepository.findAll();}

    @GetMapping("/workout/{id}")
    Workout getWorkoutById(@PathVariable Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new WorkoutFoundException(id));
    }
    @PutMapping("/workout/{id}")
    Workout updateWorkout(@RequestBody Workout newWorkout, @PathVariable Long id) {
        return workoutRepository.findById(id)
                .map(Workout -> {
                    Workout.setMuscle(newWorkout.getMuscle());
                    Workout.setName(newWorkout.getName());
                    Workout.setTime(newWorkout.getTime());
                    Workout.setSett(newWorkout.getSett());

                    if (newWorkout.getImage() != null && !newWorkout.getImage().isEmpty()) {
                        Workout.setImage(newWorkout.getImage());
                    }
                    return workoutRepository.save(Workout);
                }).orElseThrow(() -> new WorkoutFoundException(id));
    }
    @DeleteMapping("/workout/{id}")
    String deleteWorkout(@PathVariable Long id) {
        if (!workoutRepository.existsById(id)) {
            throw new WorkoutFoundException(id);
        }
        workoutRepository.deleteById(id);
        return "Workout with id " + id + " has been deleted success.";
    }

}
