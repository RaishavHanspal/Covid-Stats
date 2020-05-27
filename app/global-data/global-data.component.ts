import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-global-data',
  templateUrl: './global-data.component.html',
  styleUrls: ['./global-data.component.css']
})
export class GlobalDataComponent implements OnInit {
  newCases: any;
  newDead: any;
  newRecovered: any;
  totalCases: any;
  totalDead: any;
  totalRecovered: any;
  active: number;
  testdataflag = false;
  lastupdatedtime: any;
  deadpercent: any;
  totalTests: any;
  closed: any;
  timeUpdate: any;
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
    this.GetData();
    this.service.selected = "WORLD";
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
        this.lastupdatedtime = new Date(this.timeUpdate);
        this.totalCases = APIdata.data.total_cases;
        this.totalRecovered = APIdata.data.recovery_cases;
        this.totalDead = APIdata.data.death_cases;
        this.active = APIdata.data.currently_infected;
        this.closed = APIdata.data.cases_with_outcome;
        this.deadpercent = APIdata.data.general_death_rate;
        this.service.totalCasesWorld = this.totalCases;
        this.service.totalRecoveredWorld = this.totalRecovered;
        this.service.totalDeadWorld = this.totalDead;
        this.service.activeWorld =this.active;
        this.service.closedWorld =this.closed;

    }, error=>{
        this.router.navigate(['/']);
    });

    this.service.GetWorld2().subscribe(data=>{
      this.newCases = data.todayCases;
      this.newDead = data.todayDeaths;
      this.totalTests = data.tests;
    })
  }
  tableFlag : boolean = false;
  Table(){
      this.tableFlag =!this.tableFlag;
      if(this.tableFlag)
        this.service.selected = "WORLD - Country Wise";
      else
      this.service.selected = "WORLD";
  }

}
