package com.socialmediaapp.gymapplication.service;

import com.socialmediaapp.gymapplication.model.Image;

import java.util.List;

public interface ImageService {
    Image create(Image image);
    List<Image> viewAll();//retrieving all images
    Image viewById(long id);
    Image updateImage(Image updatedImage); // Add this method for updating image data
    void deleteImage(Image image); // Add this method for deleting an image
}
