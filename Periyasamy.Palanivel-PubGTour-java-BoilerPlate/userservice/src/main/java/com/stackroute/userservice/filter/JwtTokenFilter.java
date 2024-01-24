/**
 * 
 */
package com.stackroute.userservice.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.stackroute.userservice.entity.User;
import com.stackroute.userservice.service.CustomUserDetailsService;
import com.stackroute.userservice.util.JwtTokenUtility;

/**
 * @author ubuntu
 *
 * Class Responsible for validate Authentication token received in HTTP request
 */
@Component
public class JwtTokenFilter extends OncePerRequestFilter {
	
	
	@Autowired
	JwtTokenUtility jwtUtil;
	
	
	@Autowired
	CustomUserDetailsService userDetServ;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authHeader = request.getHeader("Authorization");
		
		String token = null;
		String userName = null;
		
		
		if(authHeader != null && authHeader.startsWith("Bearer")) {
			
			token = authHeader.substring(7);
			userName = jwtUtil.extractUserName(token);
		}

		if(userName !=null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
			UserDetails userDetails = userDetServ.loadUserByUsername(userName);
			
			
			if(jwtUtil.validateToken(token, userDetails)) {
				
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				
				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				
			}
			
			
			
			
		}
		
		filterChain.doFilter(request, response);
		
		
		
	}
	
	

	
	
}
