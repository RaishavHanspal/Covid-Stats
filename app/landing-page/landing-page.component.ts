import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { getViewData } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  JsonData : any;
  constructor(public service : MainService) { }

  ngOnInit() {
  }
}
