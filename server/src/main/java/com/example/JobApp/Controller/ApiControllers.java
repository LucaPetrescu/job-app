package com.example.JobApp.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.management.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.example.JobApp.Model.Job;
import com.example.JobApp.Model.User;
import com.example.JobApp.Repos.JobRepo;
import com.example.JobApp.Repos.UserRepo;
import com.fasterxml.jackson.core.JsonProcessingException;

import ch.qos.logback.core.subst.Token.Type;

@RestController
public class ApiControllers {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JobRepo jobRepo;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/test")
    public String getString() {
        return "Hello";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/registerUser")
    public User registerUser(@RequestBody User user) throws Exception {
        try {
            User emailEntry = userRepo.findByEmail(user.getEmail());
            if (emailEntry != null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
            } else {
                String userPassword = user.getPassword();
                String encodedPassword = passwordEncoder.encode(userPassword);
                user.setPassword(encodedPassword);
                userRepo.insert(user);
                return user;
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/loginUser")
    public User loginUser(@RequestBody User user) throws Exception {
        System.out.println(user.getEmail());
        try {
            User emailEntry = userRepo.findByEmail(user.getEmail());
            if (emailEntry == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong email or password");
            }

            boolean passwordChecker = passwordEncoder.matches(user.getPassword(), emailEntry.getPassword());

            if (passwordChecker) {
                return emailEntry;
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong email or password");
            }

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Message" + e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addJob")
    public void addJob(@RequestBody Job job) throws Exception {
        System.out.println(job.getCompanyName());
        jobRepo.insert(job);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/getJobsForUser/{userId}", method = RequestMethod.GET)
    public List<Job> getJobsForUser(@PathVariable String userId) {
        List<Job> jobs = new ArrayList<>();
        List<Job> foundJobs = new ArrayList<>();
        jobs = jobRepo.findAll();
        for (Job job : jobs) {
            if (job.getUserId().equals(userId)) {
                foundJobs.add(job);
            }
        }
        return foundJobs;

    }
}
