# PubGTour - A Case Study


## Build & Deploy Steps

- Clone the Periyasamy.Palanivel-PubGTour-java-BoilerPlate of dev-pubgui branch in your local linux machine.
- Open Terminal & Go to base directory of Periyasamy.Palanivel-PubGTour-java-BoilerPlate/
- Execute command 
       
    *   "sudo docker-compose down -v" (execute command clearup the mysql db data volume stored for this project if project ran already)
    *   "sudo docker-compose up --build" 

- Once executed, it will follow below flow.
     
    1.  Build all the components mysqldb image, userservice, favourite service, pubg ui
    2.  Then docker will start all the components & at the end of log you can see the angular karma unit tests & e2e test executed successfully.
    
## Application Flow Steps Developed

  - Access the application UI in http://localhost:4200.
  - At first no user details will be available(except e2e test user "testuser" & password "testpassword"), user have to click register option to registe the user(validation available).
  - After successfull registration, user have to login using the registered credentials(validation available for invalid user).
  - On successfull login, dashboard page will be visible with pre-loaded list of PUBG tournaments from PUBG official website https://api.pubg.com/tournaments/
  - On clicking individual tournaments, list of matches will be available.
  - On clicking individual matches, match details will be shown.
  - User can add favourite match by clicking "Add to Favourite" button. If user added add to favourite, then angular animation heart icon will be shown.
  - User can navigate to favourite matches nav tab to see list of matches user added as favourite.
  - User can  remove the favourite matched under favourite matches tab by clicking trash icon symbol.




**Note:** I am stuck now to proceed with Component Integration for gitlab-ci.yml, as gitlab has disabled Settings option to register gitlab-runner, Raised GSD already & awaitng resolution.
 If the reviewer have access, kindly help in setup the gitlab-runner to run gitlab-ci.yml file.


