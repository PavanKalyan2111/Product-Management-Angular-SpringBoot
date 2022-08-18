package com.example.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.user.model.User;
import com.example.user.repository.UserRepostiory;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserRepostiory userRepostiory;
	
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return this.userRepostiory.findAll();
	}
	
	@PostMapping("/users")
	public User addUser(@RequestBody User user) {
	return	this.userRepostiory.save(user);
	}
}
