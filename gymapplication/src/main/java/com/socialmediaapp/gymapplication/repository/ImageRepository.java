package com.socialmediaapp.gymapplication.repository;

import com.socialmediaapp.gymapplication.model.Image;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends CrudRepository<Image, Long> {

}