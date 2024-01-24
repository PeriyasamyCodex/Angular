/**
 * 
 */
package com.stackroute.userservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.stackroute.userservice.entity.RegisterUserRequest;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.repository.UserRepo;

/**
 * @author Periyasamy Palanivel
 *
 *Class responsible for registering the new user  
 */
@Service
public class RegisterUserService {

	@Autowired
	UserRepo userRepo;

	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	/**
	 * Method to register new user
	 * 
	 * @param registerUserRequest
	 * @return
	 * @throws Exception
	 */
	public String registerUser(@RequestBody RegisterUserRequest registerUserRequest) throws Exception {

		System.out.println("User from UI --->"+registerUserRequest.getUserName());
		if (userRepo.findByUserName(registerUserRequest.getUserName()) != null) {

			throw new Exception("UserName Already Exists");
		}

		try {

			User user = new User();
			user.setUserName(registerUserRequest.getUserName());
			user.setPassWord(bCryptPasswordEncoder.encode(registerUserRequest.getPassWord()));
			user.setEmail(registerUserRequest.getEmail());

			userRepo.save(user);

			System.out.println("User Registered Successfully");

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new Exception("Server Problem, Unable to Register User");

		}

		return "Success";
	}

}
