/**
 * 
 */
package com.stackroute.userservice.controller;


import static org.hamcrest.CoreMatchers.any;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
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
import com.stackroute.userservice.config.TestSecurityConfiguration;
import com.stackroute.userservice.entity.RegisterUserRequest;
import com.stackroute.userservice.repository.UserRepo;
import com.stackroute.userservice.service.RegisterUserService;

/**
 * @author ubuntu
 *
 */
@RunWith(SpringRunner.class)
@WebMvcTest(RegisterUserController.class)
@ContextConfiguration(classes = {TestSecurityConfiguration.class})
@ComponentScan(basePackages ="com.stackroute")
public class RegisterUserControllerTest {
	
	
	@Autowired
	MockMvc mockMvc;
	
	
	RegisterUserRequest regUserReq;
	
	
	@Before
	public void init() {
		
		regUserReq = new RegisterUserRequest();
		regUserReq.setUserName("user");
		regUserReq.setPassWord("password");
		regUserReq.setEmail("dummy@mail.com");
		
	}
	

	@MockBean
	RegisterUserService regUserServ;
	
	@MockBean
	UserRepo userRepo;
	
	
	@Test
	public void testRegisterUser() throws Exception {
		
		Mockito.when(regUserServ.registerUser(Mockito.any(RegisterUserRequest.class))).thenReturn("Success");
		
		MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.post("/registerUser").content(asJsonString(regUserReq))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				)
				.andExpect(status().isOk())
				.andReturn();
		
		assertTrue(mvcResult.getResponse().getContentAsString().equals("Success"));
		
				
		
		
	}


	public static String asJsonString(final Object obj) {
		
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}
	
	
	

}
