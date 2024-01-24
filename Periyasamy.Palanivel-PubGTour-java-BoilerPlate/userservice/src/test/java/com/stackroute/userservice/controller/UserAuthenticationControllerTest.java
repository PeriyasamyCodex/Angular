/**
 * 
 */
package com.stackroute.userservice.controller;

import static org.hamcrest.CoreMatchers.any;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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
import org.springframework.security.core.AuthenticationException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.config.TestSecurityConfiguration;
import com.stackroute.userservice.entity.AuthRequest;
import com.stackroute.userservice.entity.RegisterUserRequest;
import com.stackroute.userservice.repository.UserRepo;
import com.stackroute.userservice.service.RegisterUserService;
import com.stackroute.userservice.service.UserAuthenticationService;
import com.stackroute.userservice.util.JwtTokenUtility;

/**
 * @author ubuntu
 *
 */
@RunWith(SpringRunner.class)
@WebMvcTest(RegisterUserController.class)
@ContextConfiguration(classes = { TestSecurityConfiguration.class })
@ComponentScan(basePackages = "com.stackroute")
public class UserAuthenticationControllerTest {

	@Autowired
	MockMvc mockMvc;

	AuthRequest authRequest;

	@Before
	public void init() {

		authRequest = new AuthRequest();
		authRequest.setUserName("user");
		authRequest.setPassWord("password");

	}

	@MockBean
	UserAuthenticationService usrAuthServ;

	@MockBean
	UserRepo userRepo;

	@Autowired
	JwtTokenUtility jwtUtil;

	@Test
	public void testAuthenticateUser() throws Exception {

		Mockito.doNothing().when(usrAuthServ).authernticateUser(authRequest);

		this.mockMvc
				.perform(MockMvcRequestBuilders.post("/authenticate").content(asJsonString(authRequest))
						.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andExpect(jsonPath("$.userName").value("user"))
				.andExpect(jsonPath("$.authJwtToken").isNotEmpty());

	}

	public static String asJsonString(final Object obj) {

		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

}
