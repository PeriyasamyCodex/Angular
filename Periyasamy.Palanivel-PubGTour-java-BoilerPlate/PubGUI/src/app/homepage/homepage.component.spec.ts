import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PubgdataService } from 'src/app/services/pubgdata.service';
import { PubgServiceMock } from 'src/app/mocks/pubg.service.mock';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports: [
      RouterTestingModule,HttpClientModule,ReactiveFormsModule
    ],
      declarations: [ HomepageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [

        {provide:PubgdataService,useClass: PubgServiceMock}
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pubg tournaments should have 3 tournaments', () => {
    expect(component.pubgTournResp.tournaments.length).toEqual(3);
  });

  it('pubg tournaments should have 0th index values as tour1', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#tournBtn0').textContent).toContain('tour1');
  });

  it('pubg tournament button clicked', () => {
   
    spyOn(component,'onSelect');
    el = fixture.debugElement.query(By.css("#tournBtn0")).nativeElement;
    el.click();
   
    fixture.detectChanges();
    
    expect(component.onSelect).toHaveBeenCalledTimes(1);
   
    
   
  });

  it('pubg tournament match value should be match1', () => {  
   
   
    fixture.detectChanges();
    component.pubgTournResp.tournaments[0].showbody=true;
    component.getTournamentMatchList(component.pubgTournResp.tournaments[0]);
  
    expect(component.tournMatchList[0].id).toContain('match1');
  
   
  });

  it('pubg tournament match details should be returned for match1', () => {  
   
   
    
    let tournaments:any = {};
    tournaments.id="match1";
    component.getTournamentMatchDetails(tournaments);
    fixture.detectChanges();
    expect(tournaments.mapName).toContain('erangel');
  
   
  });

  
});
