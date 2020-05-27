import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newCases: any;
  newDead: any;
  newRecovered: any;
  totalCases: any;
  totalDead: any;
  totalRecovered: any;
  active: number;
  mild: any;
  critical: any;
  Recpercent: any;
  Deadpercent: any;
  closed: any;
  timeUpdate: any = "Invalid Date";
  mildpercent: any;
  critpercent: any;
  ActiveClosedflag: boolean = false;
  month: any;
  year: any;
  day: any;
  time: any;

  constructor(private service: MainService, private router:Router) { }

  ngOnInit() {
    this.totalCases =  this.service.totalCasesWorld;
    this.totalDead =  this.service.totalDeadWorld;
    this.totalRecovered =this.service.totalRecoveredWorld;
    this.active =  this.service.activeWorld;
    this.closed = this.service.closedWorld;
    this.critical = this.service.criticalWorld ;
    this.critpercent = this.service.critpercentWorld;
    this.mild = this.service.mildWorld  ;
    this.mildpercent = this.service.mildpercentWorld ;
    this.GetData();
    this.service.GetCountryData();
    this.service.GetStateData();
    this.service.selected = "HOME";
  }
  GetData(){
    this.service.GetWorld().subscribe(data=>{
      console.log(data);
      var APIdata = data;
      this.timeUpdate = APIdata.data.last_update;
      this.month = this.timeUpdate.substring(0,3);
      this.year = this.timeUpdate.substring(8,12);
      this.day = this.timeUpdate.substring(5,7);
      this.time = this.timeUpdate.substring(14,19);
      this.timeUpdate = this.day + "/" + this.month+ "/" + this.year + " " +this.time + " UTC";
      this.timeUpdate = new Date(this.timeUpdate);
      this.totalCases = APIdata.data.total_cases;
      this.totalRecovered = APIdata.data.recovery_cases;
      this.totalDead = APIdata.data.death_cases;
      this.closed = APIdata.data.cases_with_outcome;
      this.active = APIdata.data.currently_infected;
      this.mild = APIdata.data.mild_condition_active_cases;
      this.mildpercent = APIdata.data.active_cases_mild_percentage;
      this.critical = APIdata.data.critical_condition_active_cases;
      this.critpercent = APIdata.data.active_cases_critical_percentage;
      this.Recpercent = APIdata.data.closed_cases_recovered_percentage;
      this.Deadpercent = APIdata.data.closed_cases_death_percentage;
      this.service.totalCasesWorld = this.totalCases;
      this.service.totalRecoveredWorld = this.totalRecovered;
      this.service.totalDeadWorld = this.totalDead;
      this.service.activeWorld =this.active;
      this.service.closedWorld =this.closed;
      this.service.criticalWorld = this.critical;
      this.service.critpercentWorld = this.critpercent;
      this.service.mildWorld = this.mild;
      this.service.mildpercentWorld = this.mildpercent ;


    });
  }

}
