package com.stackroute.favouriteservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class FavouriteserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FavouriteserviceApplication.class, args);
	}

}
