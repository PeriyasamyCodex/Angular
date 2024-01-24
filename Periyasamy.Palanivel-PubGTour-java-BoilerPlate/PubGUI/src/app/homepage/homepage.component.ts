import { Component, OnInit } from '@angular/core';
import { PubgdataService } from 'src/app/services/pubgdata.service';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { forEach } from '@angular/router/src/utils/collection';
import { PUBGTournamentResponse } from 'src/app/model/PUBGTournamentResponse';
import { PUBGTournaments } from 'src/app/model/PUBGTournaments';
import { PUBGTournamentMatch } from 'src/app/model/PUBGTournamentMatch';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FavPupgMatchService } from 'src/app/services/fav-pupg-match.service';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  pubgTournResp:PUBGTournamentResponse;
  tournMatchList:any[] =[];
  loggedInUser: any={};
  favMatchRequest: any;
  userFavMatchesList: any[] = [];
  
  

  selectedTournament:number = -1;
  selectedTournamentMatches:number = -1;
  

  constructor(private pubgServ: PubgdataService, private authServ: AuthenticationService,private favPubgMatchServ: FavPupgMatchService) { 

   

  }

  ngOnInit() {
    /**
     * Get Logged in User from Local storage
     */
    this.authServ.loggedInUser.subscribe(usr => this.loggedInUser = usr);
    this.loadFavPubgMatches();
    this.pubgTournResp = new PUBGTournamentResponse();

    //Get list of PUBG tournaments
    this.pubgServ.getListOfPUBGTournaments().subscribe((resp)=>{

      this.pubgTournResp.tournaments = new Array<PUBGTournaments>();
      
      resp.data.forEach((tournData,tourIndex) => {
        this.pubgTournResp.tournaments[tourIndex] = new PUBGTournaments();
        this.pubgTournResp.tournaments[tourIndex].tournId=tournData.id;
       
      });

      console.log("Tournament Response: " +JSON.stringify(this.pubgTournResp));
     
    });

    
  }

   /**
   * Load Favourite PUB Matches for User
   */
  loadFavPubgMatches(){

    if(this.loggedInUser){

    this.favPubgMatchServ.getAllFavMatches(this.loggedInUser.userName).subscribe((resp)=>{

      this.userFavMatchesList = resp;
      console.log("List of Favourite Matches ->"+JSON.stringify(this.userFavMatchesList));

      resp.forEach(favMatch => {

        this.userFavMatchesList.push(favMatch.favMatchId);
        
      });

    });

  }else{
    console.error('unable to load favourite matches');
  }

  }

/**
 * Get Tournament Match List for input Tournament ID
 * @param tournament 
 */
getTournamentMatchList(tournament:any){
  console.log('Tournment showbody ->'+tournament.showbody);
if(tournament.showbody==true){

  console.log('Tournment ID ->'+tournament.tournId);

    this.pubgServ.getTournamentMatchList(tournament.tournId).subscribe((respMatchList) => {

     this.tournMatchList = [];

     respMatchList.data.relationships.matches.data.forEach((tourMatch,index) => {
      this.tournMatchList[index] = {};

      this.tournMatchList[index].id=tourMatch.id;
       this.getTournamentMatchDetails(this.tournMatchList[index]);
     });
     
    });

}
  

    

}

/**
 * Get Tournament Match Details for Match ID
 * @param pubgTournMatchObject 
 */
getTournamentMatchDetails(pubgTournMatchObject:any){

  console.log('Match ID ->'+pubgTournMatchObject.id);
  
   let tournMatchDetails:any;

    this.pubgServ.getTournamentMatchDetails(pubgTournMatchObject.id).subscribe((respMatchDetails) => {

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
 * set selected tournament paramenter to expand the respective tournament in UI
 * @param index 
 * @param tournament 
 */
onSelect(index:number,tournament:any){
  console.log('Element Ref'+index);
 this.selectedTournament=index;
 if(!tournament.showbody){
  tournament.showbody=true;

 }else if(tournament.showbody==true){

  tournament.showbody=false;
 }else if(tournament.showbody==false){
  tournament.showbody=true;
 }
     
}


/**
 * set selected tournament matches paramenter to expand the respective tournament match in UI
 * @param index 
 * @param tournament 
 */
onSelectTournament(index:number){
  
 this.selectedTournamentMatches=index;
 
     
}

/**
 * Add Favourite Match to the User
 * @param matchId 
 */
addToFavourites(matchId:string){
  
  this.favMatchRequest = {};
  this.favMatchRequest.matchId=matchId;
  this.favMatchRequest.userName=this.loggedInUser.userName;
  this.favPubgMatchServ.addToFavourite(this.favMatchRequest).subscribe((respMatchDetails) => {

  console.log('Added to Favourites Successfully');
  this.loadFavPubgMatches();

  });

}


}
