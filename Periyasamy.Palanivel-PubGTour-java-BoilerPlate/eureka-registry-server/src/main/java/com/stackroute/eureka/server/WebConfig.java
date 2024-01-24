/**
 * 
 */
package com.stackroute.eureka.server;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author ubuntu
 *
 */
@Configuration
public class WebConfig implements WebMvcConfigurer{
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {

		registry.addMapping("/**").allowedOrigins("*").allowedHeaders("*").allowedMethods("HEAD","OPTIONS","GET","POST","PUT","PATCH","DELETE").maxAge(3600);
	}

}
