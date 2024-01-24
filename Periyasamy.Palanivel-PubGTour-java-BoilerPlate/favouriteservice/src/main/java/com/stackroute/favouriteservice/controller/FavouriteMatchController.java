/**
 * 
 */
package com.stackroute.favouriteservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.favouriteservice.entity.FavMatchRequest;
import com.stackroute.favouriteservice.entity.FavouriteMatch;
import com.stackroute.favouriteservice.service.FavouriteMatchService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;

/**
 * @author ubuntu
 *
 */
@RestController
@Api(tags = "Favourite Match Controller")
@SwaggerDefinition(tags = {@Tag(name = "Favourite Match Controller",description = "Operations pertaining to do CRUD on Favourite Match for user in PUBGTOUR UI")})
public class FavouriteMatchController {
	
	@Autowired
	FavouriteMatchService faveMatchServ;
	
	
	@GetMapping("/getAllFavMatchForUser/{userName}")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Get All Favourite Matches for user in PUBUI App",response = List.class)
	public List<FavouriteMatch> getAllFavForUser(@PathVariable String userName){
		
		System.out.println("Entering into get all fav user");
		
		return faveMatchServ.gettAllFavMatchForUser(userName);
	}
	
	@PostMapping("/addToFav")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Add Favourite Matches to user in PUBUI App")
	public void addMatchToFavourites(@RequestBody FavMatchRequest favMatchRequest ) {
		
		faveMatchServ.addFavMatchToUser(favMatchRequest);
		
	}
	
	@DeleteMapping("/deleteFavMatch/{matchId}")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Remove  Favourite Matches for user in PUBUI App")
	public void removeMatchFromFavourites(@PathVariable String matchId ) {
		
		faveMatchServ.deleteFavMatchToUser(matchId);
		
	}

}
