package com.fitness.social.media.platform.exception;

public class WorkoutFoundException extends RuntimeException{
    public WorkoutFoundException(Long id){super("could not found the user with id"+ id);}
}
