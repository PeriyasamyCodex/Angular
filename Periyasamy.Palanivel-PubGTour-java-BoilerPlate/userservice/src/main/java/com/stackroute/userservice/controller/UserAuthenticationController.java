/**
 * 
 */
package com.stackroute.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.userservice.entity.AuthRequest;
import com.stackroute.userservice.entity.AuthResponse;
import com.stackroute.userservice.service.UserAuthenticationService;
import com.stackroute.userservice.util.JwtTokenUtility;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;

/**
 * @author ubuntu
 *
 */
@RestController
@Api(tags = "User Authentication")
@SwaggerDefinition(tags = {@Tag(name = "User Authentication",description = "Operations pertaining to authenticate user for PUBGTOUR UI")})

public class UserAuthenticationController {

	@Autowired
	private UserAuthenticationService userAuthServ;

	@Autowired
	private JwtTokenUtility jwtUtil;

	@PostMapping("/authenticate")
	@ApiOperation(value = "Authenticate the user for PUBUI App",response = String.class)
	public AuthResponse authernticateUser(@RequestBody AuthRequest authRequest) throws Exception {

		try {
			// Authenticate the user
			userAuthServ.authernticateUser(authRequest);
		} catch (AuthenticationException e) {
			e.printStackTrace();
			// TODO Auto-generated catch block
			throw new Exception("Invalid Username Or PassWord!");
		}

		AuthResponse authResponse = new AuthResponse();
		authResponse.setUserName(authRequest.getUserName());
		authResponse.setAuthJwtToken(jwtUtil.generateToken(authRequest.getUserName()));

		return authResponse;
	}

}
