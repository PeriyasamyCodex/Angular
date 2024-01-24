/**
 * 
 */
package com.stackroute.favouriteservice.service;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.favouriteservice.entity.FavouriteMatch;
import com.stackroute.favouriteservice.repository.FavouriteMatchRepo;

/**
 * @author ubuntu
 *
 */
@ComponentScan(basePackages = "com.stackroute")
@RunWith(SpringRunner.class)
@DataJpaTest
public class FavouriteMatchServiceTest {
	
	
	@Autowired
	FavouriteMatchRepo favMatchRepo;
	
	
	
	@Before
	public void init() {
		FavouriteMatch favMatchRequest = new FavouriteMatch();
		favMatchRequest.setUserName("user");
		favMatchRequest.setFavMatchId("dummymatchid");
		
		favMatchRepo.save(favMatchRequest);
		
	}
	
	
	
	@Test
	public void testgettAllFavMatchForUser() {
		
		assertTrue(favMatchRepo.findByUserName("user").size()>0);
	}
	
	@Test
	public void testDeleteByFavMatchId() {
		
		init();
		favMatchRepo.deleteByFavMatchId("dummymatchid");
		
	}

}
