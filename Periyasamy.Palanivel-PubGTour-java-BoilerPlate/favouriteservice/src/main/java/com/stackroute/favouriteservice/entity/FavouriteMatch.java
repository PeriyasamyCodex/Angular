/**
 * 
 */
package com.stackroute.favouriteservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Periyasamy Palanivel
 *
 */
@Entity
@Table(name = "FAV_MATCH_TB")
public class FavouriteMatch {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(name="FAVMATCHID")
	private String favMatchId;
	@Column(name="USERNAME")
	private String userName;
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the favMatchId
	 */
	public String getFavMatchId() {
		return favMatchId;
	}
	/**
	 * @param favMatchId the favMatchId to set
	 */
	public void setFavMatchId(String favMatchId) {
		this.favMatchId = favMatchId;
	}
	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	

}
