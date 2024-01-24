import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FavPupgMatchService } from 'src/app/services/fav-pupg-match.service';
import { PubgdataService } from 'src/app/services/pubgdata.service';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

@Component({
  selector: 'app-favouritepage',
  templateUrl: './favouritepage.component.html',
  styleUrls: ['./favouritepage.component.css']
})
export class FavouritepageComponent implements OnInit {


  loggedInUser: any={};
  userFavMatchesList: any[] = [];

  selectedTournamentMatches:number = -1;

  constructor(private pubgServ: PubgdataService, private authServ: AuthenticationService,private favPubgMatchServ: FavPupgMatchService) { }

  ngOnInit() {
    /**
     * Get Logged in User from Local storage
     */
    this.authServ.loggedInUser.subscribe(usr => this.loggedInUser = usr);

    
    this.loadFavPubgMatches();
  }

  /**
   * Load Favourite PUB Matches for User
   */
  loadFavPubgMatches(){

    if(this.loggedInUser){

    this.favPubgMatchServ.getAllFavMatches(this.loggedInUser.userName).subscribe((resp)=>{
      this.userFavMatchesList = [];
    

      resp.forEach((favMatch,index) => {

        this.userFavMatchesList.push({
          favMatchId:favMatch.favMatchId
        });
        this.getTournamentMatchDetails(this.userFavMatchesList[index]);
        
      });

    });

  }else{
    console.error('unable to load favourite matches');
  }

  }


/**
 * Get Tournament Match Details for input Match Object with Match Id
 * @param pubgTournMatchObject 
 */
getTournamentMatchDetails(pubgTournMatchObject:any){

  console.log('Match ID ->'+pubgTournMatchObject.favMatchId);
  
   let tournMatchDetails:any;

    this.pubgServ.getTournamentMatchDetails(pubgTournMatchObject.favMatchId).subscribe((respMatchDetails) => {

      tournMatchDetails = respMatchDetails.data;

      pubgTournMatchObject.createdAt=tournMatchDetails.attributes.createdAt;
      pubgTournMatchObject.duration=tournMatchDetails.attributes.duration;
      pubgTournMatchObject.gameMode=tournMatchDetails.attributes.gameMode;
      pubgTournMatchObject.isCustomMatch=tournMatchDetails.attributes.isCustomMatch;
      pubgTournMatchObject.mapName=tournMatchDetails.attributes.mapName;
      pubgTournMatchObject.matchId=tournMatchDetails.attributes.matchId;
      pubgTournMatchObject.matchType=tournMatchDetails.attributes.matchType;
      pubgTournMatchObject.seasonState=tournMatchDetails.attributes.seasonState;
      pubgTournMatchObject.shardId=tournMatchDetails.attributes.shardId;
      pubgTournMatchObject.stats=tournMatchDetails.attributes.stats;
      pubgTournMatchObject.tags=tournMatchDetails.attributes.tags;
      pubgTournMatchObject.titleId=tournMatchDetails.attributes.titleId;


    
    });


 

  
}

/**
 * Remove Tournament Fav Match by Match Id
 * @param favMatchId 
 */
removeTournamentFavMatch(favMatchId:string){

  console.log('Match ID to remove->'+favMatchId);
  
   let tournMatchDetails:any;

    this.favPubgMatchServ.removeFromFavourite(favMatchId).subscribe((respMatchDetails) => {
      console.log('Favourite Matched removed successfully');
      this.loadFavPubgMatches();
    
    });
  
}

/**
 * Set selected Tournament Matches to expand the details in UI
 * @param index 
 */
onSelectTournament(index:number){
  
  this.selectedTournamentMatches=index;
  
      
 }


}
