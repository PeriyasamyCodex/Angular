/**
 * 
 */
package com.stackroute.favouriteservice.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.favouriteservice.entity.FavouriteMatch;

/**
 * @author Periyasamy Palanivel
 * 
 * Class to handle default CRUD & custom methods for User's Favourite Match
 *
 */
@Repository
@Transactional
public interface FavouriteMatchRepo extends JpaRepository<FavouriteMatch, Integer>{

	List<FavouriteMatch> findByUserName(String userName);
	
	void deleteByFavMatchId(String favMatchId);
}
