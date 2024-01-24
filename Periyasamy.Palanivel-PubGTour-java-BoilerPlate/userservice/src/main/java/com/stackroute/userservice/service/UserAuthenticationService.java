package com.stackroute.userservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.stackroute.userservice.entity.AuthRequest;

/**
 * @author Periyasamy Palanivel
 *
 *Class Responsible for authenticating the user when login
 */
@Service
public class UserAuthenticationService {

	@Autowired
	private AuthenticationManager authManager;

	/**
	 * Method to authenticate user with input username & password
	 * @param authRequest
	 * @throws Exception
	 */
	public void authernticateUser(AuthRequest authRequest) throws Exception {

		authManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassWord()));

	}

}
