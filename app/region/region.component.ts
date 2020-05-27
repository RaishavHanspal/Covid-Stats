import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';

export interface TableElement {
  Region: string;
  active: number;
  confirmed: number;
  deceased: number;
  recovered: number;
  deltaconfirmed: number;
  deltadeaths: number;
  deltarecovered: number;
  notes: string;
}

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  Regions = [];
  displayedColumns: string[] = ['Region', 'confirmed', 'active', 'deceased', 'recovered'  , 'deltaconfirmed','deltadeaths', 'deltarecovered'];

  // ELEMENT_DATA : TableElement[];
  dataSource :any = [];
  ELEMENT_DATA : TableElement[] = [];
  constructor(private service: MainService, private dialog:MatDialog, private router:Router) {
    this.ELEMENT_DATA = this.service.regions;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    if(this.isEmptyObject(this.service.regions)){
        this.router.navigate(['/']);
    }
  }

  isEmptyObject(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
