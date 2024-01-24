/**
 * 
 */
package com.stackroute.userservice.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author ubuntu
 *
 *Class Responsible for Processing/Generating JWT token for the user
 */
@Service
public class JwtTokenUtility {

	private String secretkey = "pubgui";

	/**
	 * Method to generate token when authenticating user
	 * @param userName
	 * @return
	 */
	public String generateToken(String userName) {
		Map<String, Object> claims = new HashMap<String, Object>();
		return createToken(claims, userName);

	}

	/**
	 * Method to create token when authenticating user
	 * @param claims
	 * @param userSub
	 * @return
	 */
	private String createToken(Map<String, Object> claims, String userSub) {

		return Jwts.builder().setClaims(claims).setSubject(userSub).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, secretkey).compact();
	}

	/**
	 * Method to validate user token
	 * @param token
	 * @param userDetails
	 * @return
	 */
	public Boolean validateToken(String token, UserDetails userDetails) {

		String userName = extractUserName(token);
		return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));

	}

	/**
	 * Method to extract all claims from token
	 * @param token
	 * @return
	 */
	private Claims extractAllClaims(String token) {

		return Jwts.parser().setSigningKey(secretkey).parseClaimsJws(token).getBody();
	}

	/**
	 * Method to extract Claims from user token
	 * @param <T>
	 * @param token
	 * @param claimsResolver
	 * @return
	 */
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

		Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	/**
	 * Method to extract Username from CLaims Object
	 * @param token
	 * @return
	 */
	public String extractUserName(String token) {

		return extractClaim(token, Claims::getSubject);
	}

	/**
	 * Method to Extract Expiration from Claims Object 
	 * @param token
	 * @return
	 */
	public Date extractExpiration(String token) {

		return extractClaim(token, Claims::getExpiration);
	}

	/**
	 * Method to Check whether the user token is expired or not
	 * @param token
	 * @return
	 */
	public Boolean isTokenExpired(String token) {

		return extractExpiration(token).before(new Date());
	}

}
