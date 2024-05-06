package com.project.fitnet.exception;

public class MeelPlanNotFoundException extends RuntimeException{
    public  MeelPlanNotFoundException(Long id){
        super("Could not found the user with id "+ id);
    }
}
