/**
 * 
 */
package com.stackroute.favouriteservice.controller;

import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.favouriteservice.entity.FavMatchRequest;
import com.stackroute.favouriteservice.entity.FavouriteMatch;
import com.stackroute.favouriteservice.repository.FavouriteMatchRepo;
import com.stackroute.favouriteservice.service.FavouriteMatchService;


/**
 * @author ubuntu
 *
 */
@RunWith(SpringRunner.class)
@WebMvcTest(FavouriteMatchController.class)
@ComponentScan(basePackages = "com.stackroute")
public class FavouriteMatchControllerTests {
	
	
	@Autowired
	MockMvc mockMvc;
	
	
	FavMatchRequest favMatchRequest;
	
	
	@Before
	public void init() {
		
		favMatchRequest = new FavMatchRequest();
		favMatchRequest.setUserName("user");
		favMatchRequest.setMatchId("dummymatchid");
		
	}
	

	@MockBean
	FavouriteMatchService favouriteMatchService;
	
	@MockBean
	FavouriteMatchRepo favouriteMatchRepo;
	
	
	@Test
	public void testGetAllFavForUser() throws Exception {
		
		List<FavouriteMatch> favouriteMatchs = new ArrayList<FavouriteMatch>();
		
		FavouriteMatch favouriteMatch = new FavouriteMatch();
		favouriteMatch.setId(1);
		favouriteMatch.setUserName("user");
		favouriteMatch.setFavMatchId("dummymatchid");
		favouriteMatchs.add(favouriteMatch);
		
		Mockito.when(favouriteMatchService.gettAllFavMatchForUser((Mockito.any(String.class)))).thenReturn(favouriteMatchs);
		
		this.mockMvc.perform(MockMvcRequestBuilders.get("/getAllFavMatchForUser/user")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].favMatchId").value("dummymatchid"));
		
		
		
				
		
		
	}
	
	@Test
	public void testAddToFav() throws Exception {
		
		List<FavouriteMatch> favouriteMatchs = new ArrayList<FavouriteMatch>();
		
		FavouriteMatch favouriteMatch = new FavouriteMatch();
		favouriteMatch.setId(1);
		favouriteMatch.setUserName("user");
		favouriteMatch.setFavMatchId("dummymatchid");
		favouriteMatchs.add(favouriteMatch);
		
		Mockito.doNothing().when(favouriteMatchService).addFavMatchToUser((Mockito.any(FavMatchRequest.class)));
		
		this.mockMvc.perform(MockMvcRequestBuilders.post("/addToFav").content(asJsonString(favMatchRequest))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				)
				.andExpect(status().isOk())
				.andReturn();
		
		
		
				
		
		
	}
	
	@Test
	public void testRemoveMatchFromFavourites() throws Exception {
		
		List<FavouriteMatch> favouriteMatchs = new ArrayList<FavouriteMatch>();
		
		FavouriteMatch favouriteMatch = new FavouriteMatch();
		favouriteMatch.setId(1);
		favouriteMatch.setUserName("user");
		favouriteMatch.setFavMatchId("dummymatchid");
		favouriteMatchs.add(favouriteMatch);
		
		Mockito.doNothing().when(favouriteMatchService).deleteFavMatchToUser((Mockito.any(String.class)));
		
		this.mockMvc.perform(MockMvcRequestBuilders.delete("/deleteFavMatch/dummymatchid")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				)
				.andExpect(status().isOk())
				.andReturn();
		
		
		
				
		
		
	}


	public static String asJsonString(final Object obj) {
		
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}

}
