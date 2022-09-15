package com.example.JobApp.Repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.JobApp.Model.User;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    User findByEmail(String email);
}
