import { Component, OnInit } from '@angular/core';
import { parseString } from "xml2js";
// import * as xml2js from 'xml2js';
import { Observable } from 'rxjs'
import { MainService } from '../main.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  title: string = "";
  news = [];
  JSONdata: any;
  newsAll: any;
  newsCDCAll: any;
  newscdc: any[];

  constructor(private service: MainService) { }

  ngOnInit() {
    this.news = this.service.news;
    this.newscdc = this.service.newscdc;
    this.GetData();
    this.GetCDCdata();
    this.service.selected = "NEWS";
  }
  GetData()
  {
    this.service.GetNews().subscribe(data =>{
      this.JSONdata = this.toJson(data)
      console.log(this.JSONdata)
      this.title = this.JSONdata.rss.channel[0].description[0];
      this.newsAll = this.JSONdata.rss.channel[0].item;
      this.news = [];
      for(let i=0; i<this.newsAll.length;i++)
      {
        if(this.newsAll[i].title[0].includes("corona")
        || this.newsAll[i].title[0].includes("covid")
        || this.newsAll[i].description[0].includes("corona")
        || this.newsAll[i].description[0].includes("covid")){
        this.news.push(this.newsAll[i]);
      }}
      console.log("news", this.news);
      this.service.news = this.news;
    })
  }
  GetCDCdata(){
    this.service.GetCDCNews().subscribe(data =>{
      this.JSONdata = this.toJson(data)
      console.log(this.JSONdata);
      this.title = this.JSONdata.rss.channel[0].description[0];
      this.newsCDCAll = this.JSONdata.rss.channel[0].item;
      this.newscdc = [];
      for(let i=0; i<this.newsCDCAll.length;i++)
      {
        if(this.newsCDCAll[i].title[0].includes("corona")
        || this.newsCDCAll[i].title[0].includes("covid")
        || this.newsCDCAll[i].description[0].includes("corona")
        || this.newsCDCAll[i].description[0].includes("covid")){
        this.newscdc.push(this.newsCDCAll[i]);
      }}
      console.log("newscdc", this.newscdc);
      this.service.newscdc= this.newscdc;
    })
  }
  toJson(xml: string) : Observable<any> {
    let res;
    parseString(xml, function(error, result) {
      if (error) {
        throw new Error();
      } else {
        res = result;
        console.log(result);
      }
        // this.title = result.rss.channel[0].description[0];
    });
    return res;
}

}
