package com.stackroute.favouriteservice.controller;

import org.springframework.web.bind.annotation.RestController;

import com.stackroute.favouriteservice.entity.FavMatchRequest;
import com.stackroute.favouriteservice.service.FavouriteMatchService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private FavouriteMatchService favouriteMatchService;


    @RequestMapping(path="/getAllEmp", method=RequestMethod.GET)
    public void getTest(@RequestBody FavMatchRequest favMatchRequest) {
        favouriteMatchService.gettAllFavMatchForUser(favMatchRequest.getUserName());
    }
    
}
