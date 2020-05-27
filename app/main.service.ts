import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable()
export class MainService {
  globalUrl = "https://api.covid19api.com/summary";
  indiaUrl = "https://api.covid19india.org/"
  newsUrl = "https://www.who.int/rss-feeds/news-english.xml";
  cdcNewsUrl = "https://tools.cdc.gov/api/v2/resources/media/403372.rss";
  cookieUrl = "https://webqa.wipro.com/GetSAPSSO2cookie/jaxrs/sso/post";
  WorldUrl = "https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats";
  WorldUrl2 = "https://corona.lmao.ninja/v2/all?yesterdayhttps://corona.lmao.ninja/v2/all?yesterday";
  countries = [];
  states = [];
  regions = [];
  selected = "HOME";
  totalCasesWorld;
  totalRecoveredWorld;
  totalDeadWorld;
  activeWorld;
  closedWorld;
  activeIndia: any;
  confirmedIndia: any;
  deathsIndia: any;
  recoveredIndia: any;
  news = [];
  newscdc = [];
  chart1 =[];
  chart2=[];
  chart3=[];
  chart4=[];
  criticalWorld: any;
  critpercentWorld: any;
  mildWorld: any;
  mildpercentWorld: any;
  // country:any;
  constructor(private httpClient : HttpClient) { }

  GetWorld(): Observable<any>
  {
    return this.httpClient.get(this.WorldUrl);
  }
  GetWorld2(): Observable<any>
  {
    return this.httpClient.get(this.WorldUrl2);
  }
  GetGlobal(): Observable<any>
  {
    return this.httpClient.get(this.globalUrl);
  }

  GetCountryData()
  {
    this.GetGlobal().subscribe(data => {
      console.log(data);
      this.countries = data.Countries;
      console.log(this.countries);
    });
  }
  GetStateData()
  {
    this.GetIndia().subscribe(data => {
      console.log(data);
      this.states = data.statewise;
      console.log(this.states);
      this.activeIndia = this.states[0].active;
      this.confirmedIndia = this.states[0].confirmed;
      this.deathsIndia = this.states[0].deaths;
      this.recoveredIndia = this.states[0].recovered;
    });
  }
  GetRegion(): Observable<any>
  {
    return this.httpClient.get(this.indiaUrl + 'state_district_wise.json');
  }

  GetIndia(): Observable<any>
  {
    return this.httpClient.get(this.indiaUrl + 'data.json');
  }


  GetNews(): Observable<any>
  {
    return this.httpClient.get(this.newsUrl, { responseType: 'text' })
    // 'getXmlUrl', { responseType: 'text' }
  }

  GetCDCNews(): Observable<any>
  {
    return this.httpClient.get(this.cdcNewsUrl, { responseType: 'text' })
    // 'getXmlUrl', { responseType: 'text' }
  }


  GetCookie(body)
  {
    return this.httpClient.post(this.cookieUrl, body)
  }

}
