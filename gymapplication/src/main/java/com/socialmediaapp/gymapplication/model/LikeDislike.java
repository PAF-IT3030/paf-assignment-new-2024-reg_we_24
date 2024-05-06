package com.socialmediaapp.gymapplication.model;

import jakarta.persistence.*;

@Entity
public class LikeDislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private boolean liked; // true for like, false for dislike

    // Constructors, getters, and setters
    public LikeDislike() {
    }

    public LikeDislike(Image image, User user, boolean liked) {
        this.image = image;
        this.user = user;
        this.liked = liked;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }
}
