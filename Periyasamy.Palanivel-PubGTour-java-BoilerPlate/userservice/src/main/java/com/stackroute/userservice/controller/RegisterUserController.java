package com.stackroute.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.userservice.entity.AuthRequest;
import com.stackroute.userservice.entity.RegisterUserRequest;
import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.repository.UserRepo;
import com.stackroute.userservice.service.RegisterUserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(tags = "Register User")
@SwaggerDefinition(tags = {@Tag(name = "Register User",description = "Operations pertaining to register user for PUBGTOUR UI")})
public class RegisterUserController {

	@Autowired
	RegisterUserService regUserService;

	@PostMapping("/registerUser")
	@ApiOperation(value = "Register the New user for PUBUI App",response = String.class)
	public String registerUser(@RequestBody RegisterUserRequest registerUserRequest) throws Exception {

		return regUserService.registerUser(registerUserRequest);
	}

}
