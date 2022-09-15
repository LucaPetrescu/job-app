package com.example.JobApp.Repos;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.JobApp.Model.Job;

public interface JobRepo extends MongoRepository<Job, String> {

}
