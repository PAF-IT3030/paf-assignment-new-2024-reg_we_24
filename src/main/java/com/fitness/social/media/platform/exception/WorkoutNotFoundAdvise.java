package com.fitness.social.media.platform.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

public class WorkoutNotFoundAdvise {
    @ExceptionHandler(WorkoutFoundException.class)
    public Map<String,String> exceptionHandler (WorkoutFoundException exception){
        Map<String,String>  errorMap= new HashMap<>();
        errorMap.put("errorMessage", exception.getMessage());
        return errorMap;
    }

}
