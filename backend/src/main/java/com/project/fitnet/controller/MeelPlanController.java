package com.project.fitnet.controller;

import com.project.fitnet.exception.MeelPlanNotFoundException;
import com.project.fitnet.model.MeelPlan;
import com.project.fitnet.repository.MeelPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/* Created by Arjun Gautam */
@RestController
@CrossOrigin("http://localhost:3000")

public class MeelPlanController {

    @Autowired
    private MeelPlanRepository MeelPlanRepository;

    @PostMapping("/MeelPlan")
    MeelPlan newMeelPlan(@RequestBody MeelPlan newMeelPlan) {
        return MeelPlanRepository.save(newMeelPlan);
    }

    @GetMapping("/MeelPlans")
    List<MeelPlan> getAllMeelPlans() {
        return MeelPlanRepository.findAll();
    }

    @GetMapping("/meelplan/{id}")
    MeelPlan getMeelPlanById(@PathVariable Long id) {
        return MeelPlanRepository.findById(id)
                .orElseThrow(() -> new MeelPlanNotFoundException(id));
    }

    @PutMapping("/MeelPlanUpdate/{id}")
    MeelPlan updateMeelPlan(@RequestBody MeelPlan newMeelPlan, @PathVariable Long id) {
        return MeelPlanRepository.findById(id)
                .map(MeelPlan -> {
                    MeelPlan.setTitle(newMeelPlan.getTitle());
                    MeelPlan.setDescription(newMeelPlan.getDescription());
                    return MeelPlanRepository.save(MeelPlan);
                }).orElseThrow(() -> new MeelPlanNotFoundException(id));
    }

    @DeleteMapping("/MeelPlanDel/{id}")
    String deleteMeelPlan(@PathVariable Long id){
        if(!MeelPlanRepository.existsById(id)){
            throw new MeelPlanNotFoundException(id);
        }
        MeelPlanRepository.deleteById(id);
        return  "MeelPlan with id "+id+" has been deleted success.";
    }



}

