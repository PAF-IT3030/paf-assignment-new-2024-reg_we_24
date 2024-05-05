package com.fitness.social.media.platform.repository;

import com.fitness.social.media.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User,Long>{
}
