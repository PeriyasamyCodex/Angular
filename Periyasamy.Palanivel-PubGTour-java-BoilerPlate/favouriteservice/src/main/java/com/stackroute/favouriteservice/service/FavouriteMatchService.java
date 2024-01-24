/**
 * 
 */
package com.stackroute.favouriteservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.favouriteservice.entity.FavMatchRequest;
import com.stackroute.favouriteservice.entity.FavouriteMatch;
import com.stackroute.favouriteservice.repository.FavouriteMatchRepo;

/**
 * @author Periyasamy Palanivel
 * 
 * Class to handle all service call for favourite match request 
 *
 */
@Service
public class FavouriteMatchService {
	
	@Autowired
	FavouriteMatchRepo favouriteMatchRepo;
	
	
	/**
	 * Method to get all favourite match for user
	 * @param userName
	 * @return
	 */
	public List<FavouriteMatch> gettAllFavMatchForUser(String userName){
		
		return favouriteMatchRepo.findByUserName(userName);
	}
	
	/**
	 * Method to get add favourite match for user
	 * @param favMatchRequest
	 */
	public void addFavMatchToUser(FavMatchRequest favMatchRequest) {
		
		FavouriteMatch favouriteMatch = new FavouriteMatch();
		
		favouriteMatch.setFavMatchId(favMatchRequest.getMatchId());
		favouriteMatch.setUserName(favMatchRequest.getUserName());
		favouriteMatchRepo.save(favouriteMatch);
		
	}
	
	/**
	 * Method to delete favourite match for user
	 * @param delMatchId
	 */
	public void deleteFavMatchToUser(String delMatchId) {
		
		
		favouriteMatchRepo.deleteByFavMatchId(delMatchId);
		
	}

}
