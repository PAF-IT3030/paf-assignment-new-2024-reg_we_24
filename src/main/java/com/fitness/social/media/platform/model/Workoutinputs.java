package com.fitness.social.media.platform.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Workoutinputs {
@Id
@GeneratedValue

    private Long id;
    private String muscle;
    private String name;
    private String time;
    private String sett;
    private String image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        id = id;
    }

    public String getMuscle() {
        return muscle;
    }

    public void setMuscle(String muscle) {
        this.muscle = muscle;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getSett() {
        return sett;
    }

    public void setSett(String sett) {
        this.sett = sett;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
