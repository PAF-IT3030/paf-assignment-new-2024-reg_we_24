package com.fitness.social.media.platform.repository;

import com.fitness.social.media.platform.model.Workout;
import com.fitness.social.media.platform.model.Workoutinputs;
import org.springframework.data.jpa.repository.JpaRepository;
public interface WorkoutRepository extends JpaRepository<Workout,Long>{
}
