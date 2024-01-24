/**
 * 
 */
package com.stackroute.userservice.entity;

/**
 * @author ubuntu
 *
 */
public class AuthResponse {
	
	private String userName;
	private String authJwtToken;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getAuthJwtToken() {
		return authJwtToken;
	}
	public void setAuthJwtToken(String authJwtToken) {
		this.authJwtToken = authJwtToken;
	}
	
	

}
