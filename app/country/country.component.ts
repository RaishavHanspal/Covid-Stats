import { Component, OnInit, ViewChild, Inject, DoCheck } from '@angular/core';
import { MainService } from '../main.service';
import { MatSort, MatDialog } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table'
import { Router } from '@angular/router';
import { enterView } from '@angular/core/src/render3/instructions';
// import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

export interface TableElement {
  Country: string;
  CountryCode: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  NewConfirmed: number;
  NewDeaths: number;
  TotalRecovered: number;
  NewRecovered: number;
  Date: string;
  Slug: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit{
  countries = [];
  displayedColumns: string[] = ["CountryName", 'TotalConfirmed', 'TotalRecovered','TotalDeaths', 'NewConfirmed',  'NewDeaths'];
  // ELEMENT_DATA : TableElement[];

  dataSource :any = [];
  ELEMENT_DATA : TableElement[] = null;
  constructor(private service: MainService, private router:Router) {
    this.ELEMENT_DATA = this.service.countries;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.service.selected = "WORLD - Countries";
    console.log("1.", this.ELEMENT_DATA);
    console.log("2.",this.service.countries);
    console.log("3.",this.dataSource );
    if(this.isEmptyObject(this.service.countries))
    {
      this.router.navigate(['/']);
    }

      // this.router.navigate(['/']);

    this.dataSource.sort = this.sort;
  }

  isEmptyObject(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngDoCheck(){
  //   console.log("4.",this.service.countries);
  //   if(!this.service.countries){
  //     this.router.navigate(['/']);
  //   }
  // }


}
