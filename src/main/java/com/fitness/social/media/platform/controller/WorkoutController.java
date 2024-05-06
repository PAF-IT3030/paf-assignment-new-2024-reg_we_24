package com.fitness.social.media.platform.controller;

import com.fitness.social.media.platform.model.Workoutinputs;
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

    @GetMapping("/workouts")
    List<Workoutinputs>getAllWorkout(){return workoutRepository.findAll();}

    @GetMapping("/workout/{id}")
    Workoutinputs getWorkoutById(@PathVariable Long id) {
        return WorkoutRepository.findById(id)
                .orElseThrow(() -> new WorkoutFoundException(id));
    }
    @PutMapping("/workout/{id}")
    Workoutinputs updateWorkout(@RequestBody Workoutinputs newWorkout, @PathVariable Long id) {
        return WorkoutRepository.findById(id)
                .map(Workout -> {
                    Workout.setMuscle(newWorkout.getMuscle());
                    Workout.setName(newWorkout.getName());
                    Workout.setTime(newWorkout.getTime());
                    Workout.setSett(newWorkout.getSett());

                    if (newWorkout.getImage() != null && !newWorkout.getImage().isEmpty()) {
                        Workout.setImage(newWorkout.getImage());
                    }
                    return WorkoutRepository.save(Workout);
                }).orElseThrow(() -> new WorkoutFoundException(id));
    }
    @DeleteMapping("/workout/{id}")
    String deleteWorkout(@PathVariable Long id) {
        if (!WorkoutRepository.existsById(id)) {
            throw new WorkoutFoundException(id);
        }
        WorkoutRepository.deleteById(id);
        return "Workout with id " + id + " has been deleted success.";
    }

}
