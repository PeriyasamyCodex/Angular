/**
 * 
 */
package com.stackroute.userservice.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.userservice.entity.User;

/**
 * @author Periyasamy Palanivel
 *
 * Repository for User table
 */
@Repository
@Transactional
public interface UserRepo extends JpaRepository<User, Integer>{

	
	User findByUserName(String userName);
}
