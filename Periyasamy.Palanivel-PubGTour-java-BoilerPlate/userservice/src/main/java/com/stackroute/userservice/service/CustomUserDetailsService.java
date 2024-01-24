/**
 * 
 */
package com.stackroute.userservice.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.repository.UserRepo;

/**
 * @author Periyasamy Palanivel
 * 
 * Class to get UserDetails object for the user
 *
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepo userRepo;

	/**
	 *Method to retrieve User Details for input User
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = userRepo.findByUserName(username);
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassWord(),
				new ArrayList<>());
	}

}
