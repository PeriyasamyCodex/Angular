/**
 * 
 */
package com.stackroute.userservice.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author Periyasamy Palanivel
 * 
 *Class Responsible for configuring Swagger Documentation
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

	/**
	 * Create Docket Object to enable primary API configuration
	 * @return
	 */
	@Bean
	public Docket userApi() {

		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.stackroute.userservice.controller"))
				.build().apiInfo(metaData());
	}

	/**
	 * Customizing swagger to give API description
	 * @return
	 */
	private ApiInfo metaData() {

		ApiInfo apiInfo = new ApiInfo("PUBGTour UserService Application", "Application to to Register User PUBG UI Tour",
				"1.0", "Terms Of Service",
				new Contact("Periyasamy Palanivel", "https://periyasamytechstack.com",
						"Periyasamy.Palanivel@cognizant.com"),
				"Apache Licence Version 3.0", "https://www.apache.org/licenses/LICENSE-3.0",Collections.emptyList());

		return apiInfo;

	}

}
