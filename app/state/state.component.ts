import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogModule } from '@angular/material';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface TableElement {
  state: string;
  active: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  deltaconfirmed: number;
  deltadeaths: number;
  deltarecovered: number;
  lastupdatedtime: string;
  statecode: string;
  statenotes: string;
}

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent implements OnInit {

  countries = [];
  displayedColumns: string[] = ['state', 'confirmed', 'active', 'deaths', 'recovered', 'deltaconfirmed','deltadeaths', 'deltarecovered'];
  // ELEMENT_DATA : TableElement[];
  dataSource :any = [];
  ELEMENT_DATA : TableElement[] = [];
  RegionTemp: any;
  RegionArray: any =[];
  constructor(private service: MainService, private dialog:MatDialog, private router:Router) {
    this.ELEMENT_DATA = this.service.states;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.service.selected = "INDIA";
    this.dataSource.sort = this.sort;
    if(this.isEmptyObject(this.service.states)){
        this.router.navigate(['/']);
    }
  }

  // matcellflag = false;
  getstateData(StateName){
    // this.matcellflag = !this.matcellflag;
    let RegionTemp=[];
    console.log(StateName);
    this.service.GetRegion().subscribe(data => {
      console.log(data);
      RegionTemp = data;
      this.BuildRegionDetails(RegionTemp,StateName);
    });

  }

  BuildRegionDetails(RegionTemp,StateName)
  {
      if(RegionTemp[StateName.state])
        this.service.regions = RegionTemp[StateName.state].districtData;
        var keys = Object.keys(this.service.regions);
        console.log(keys);
      for(let i=0;i<keys.length;i++)
      {

        const Temp = {
          "Region": keys[i],
          "active": this.service.regions[keys[i]].active,
          "confirmed":this.service.regions[keys[i]].confirmed,
          "deceased":this.service.regions[keys[i]].deceased,
          "recovered":this.service.regions[keys[i]].recovered,
          "deltaconfirmed":this.service.regions[keys[i]].delta.confirmed,
          "deltadeaths":this.service.regions[keys[i]].delta.deceased,
          "deltarecovered":this.service.regions[keys[i]].delta.recovered
        }
        this.RegionArray.push(Temp);
      }
      this.service.regions=[];
      this.service.regions=this.RegionArray;
    console.log(this.service.regions);
    this.service.selected = "INDIA - " + StateName.state;
    this.navigate();
  }
  navigate() {
    this.router.navigate(['/Region']);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isEmptyObject(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
}
