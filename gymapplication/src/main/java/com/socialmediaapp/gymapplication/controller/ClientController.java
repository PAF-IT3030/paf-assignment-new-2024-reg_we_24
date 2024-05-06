package com.socialmediaapp.gymapplication.controller;


import com.socialmediaapp.gymapplication.model.Comment;
import com.socialmediaapp.gymapplication.model.Image;
import com.socialmediaapp.gymapplication.service.ImageService;
import com.socialmediaapp.gymapplication.service.LikeDislikeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;

@Controller
public class ClientController {

    private final ImageService imageService;
    private final LikeDislikeService likeDislikeService;
    private final CommentService commentService;

    @Autowired
    public ClientController(ImageService imageService, LikeDislikeService likeDislikeService, CommentService commentService) {
        this.imageService = imageService;
        this.likeDislikeService = likeDislikeService;
        this.commentService = commentService;
    }

    @GetMapping("/ping")
    @ResponseBody
    public String helloWorld() {
        return "Hello World!";
    }

    // returning the image id
    @GetMapping("/display")
    public ResponseEntity<byte[]> displayImage(@RequestParam("id") String idParam) {
        try {
            long id = Long.parseLong(idParam); // Convert the String ID to long
            Image image = imageService.viewById(id);
            if (image != null) {
                Blob imageData = image.getImage();
                if (imageData != null) {
                    byte[] imageBytes = imageData.getBytes(1, (int) imageData.length());
                    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
                }
            }
        } catch (NumberFormatException | SQLException e) {
            e.printStackTrace(); // Handle or log the exception as needed
        }
        return ResponseEntity.notFound().build();
    }


    //renders the home page
    @GetMapping("/")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("index");
        List<Image> imageList = imageService.viewAll();
        mv.addObject("imageList", imageList);
        return mv;
    }

    //renders the form to add a new image
    @GetMapping("/add")
    public ModelAndView addImageForm() {
        return new ModelAndView("addimage");
    }

    //handles the form submission to add a new image with the description
    @PostMapping("/add")
    public ResponseEntity<Long> addImagePost(@RequestParam("image") MultipartFile file, @RequestParam("description") String description) {
        try {
            byte[] bytes = file.getBytes();
            Blob blob = new SerialBlob(bytes);
            Image image = new Image();
            image.setImage(blob);
            image.setDescription(description); // Set the description for the image
            imageService.create(image);

            // Return the image ID as part of the response
            return ResponseEntity.ok(image.getId()); // Assuming getId() returns the image ID
        } catch (IOException | SQLException e) {
            e.printStackTrace(); // Handle or log the exception as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1L); // Return an error value
        }
    }

    // Like or dislike an image
    @PostMapping("/like-dislike")
    public ResponseEntity<Void> likeDislikeImage(@RequestParam("id") String idParam, @RequestParam("userId") String userIdParam, @RequestParam("liked") boolean liked) {
        try {
            long imageId = Long.parseLong(idParam);
            long userId = Long.parseLong(userIdParam);

            // Call the service method to like/dislike the image
            likeDislikeService.likeDislikeImage(imageId, userId, liked);
            return ResponseEntity.ok().build(); // Return success response
        } catch (NumberFormatException e) {
            e.printStackTrace(); // Handle or log the exception as needed
        }
        return ResponseEntity.badRequest().build(); // Return bad request response
    }

    // Add a comment to an image without requiring user ID
    @PostMapping("/add-comment")
    public ResponseEntity<Void> addCommentToImage(@RequestParam("id") String idParam, @RequestParam("content") String content) {
        try {
            long imageId = Long.parseLong(idParam);
            // Assuming there's no need for a user ID to add a comment
            commentService.addComment(imageId, content);
            return ResponseEntity.ok().build(); // Return success response
        } catch (NumberFormatException e) {
            e.printStackTrace(); // Handle or log the exception as needed
        }
        return ResponseEntity.badRequest().build(); // Return bad request response
    }

    //Retrieves the description using the image id
    @GetMapping("/description")
    public ResponseEntity<String> getImageDescription(@RequestParam("id") String idParam) {
        try {
            long id = Long.parseLong(idParam); // Convert the String ID to long
            Image image = imageService.viewById(id);
            if (image != null) {
                String description = image.getDescription();
                return ResponseEntity.ok(description);
            }
        } catch (NumberFormatException e) {
            e.printStackTrace(); // Handle or log the exception as needed
        }
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler({IOException.class, SerialException.class, SQLException.class})
    public ModelAndView handleFileUploadException(Exception ex, HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView("error");
        mv.addObject("errorMessage", "Error uploading file: " + ex.getMessage());
        return mv;
    }


    //update the description of the image
    @PutMapping("/update-description")
    public ResponseEntity<Void> updateImageDescription(@RequestParam("id") String idParam, @RequestBody UpdateDescriptionRequest request) {
        try {
            long id = Long.parseLong(idParam); // Convert the String ID to long
            Image image = imageService.viewById(id);
            if (image != null) {
                image.setDescription(request.getDescription()); // Update the description
                imageService.updateImage(image);
                return ResponseEntity.ok().build(); // Return success response
            }
        } catch (NumberFormatException  e) {
            e.printStackTrace(); // Handle or log the exception as needed
        }
        return ResponseEntity.notFound().build();
    }


    // Define a request class for handling description updates
    static class UpdateDescriptionRequest {
        private String description;

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

    }

    // Delete an image by ID
    @DeleteMapping("/delete-post/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") long id) {
        try {
            ImageService imageService;
            Image image = imageService.viewById(id);
            if (image != null) {
                imageService.deleteImage(image);
                return ResponseEntity.ok().build(); // Return success response
            } else {
                return ResponseEntity.notFound().build(); // Return not found response if image not found
            }
        } catch (Exception e) {
            e.printStackTrace(); // Handle or log the exception as needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return internal server error response
        }
    }

    //COMMENTS DLT EDITING
    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getCommentsForImage(@RequestParam("id") String idParam) {
        try {
            long id = Long.parseLong(idParam); // Convert the String ID to long
            List<Comment> comments = commentService.getCommentsForPost(id);
            return ResponseEntity.ok(comments);
        } catch (NumberFormatException e) {
            e.printStackTrace(); // Handle or log the exception as needed
        }
        return ResponseEntity.badRequest().build(); // Return bad request response
    }


}