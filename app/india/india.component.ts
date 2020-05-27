import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  active: any;
  confirmed: any;
  deaths: any;
  recovered: any;
  lastupdatedtime: any;
  source: any;
  totalTested: any;
  updatedTime: any;
  testdataflag = false;
  newDeaths: any;
  newConfirmed: any;


  constructor(private service: MainService, private router:Router) { }

  ngOnInit() {
    this.active = this.service.activeIndia;
    this.confirmed = this.service.confirmedIndia;
    this.deaths = this.service.deathsIndia;
    this.recovered = this.service.recoveredIndia;
    this.GetData();
    this.GetChart();
    this.service.selected = "INDIA";
  }

  GetData(){
    this.service.GetIndia().subscribe(data=>{
      console.log(data);
      var Tested = data.tested;
      console.log("Tested", Tested[Tested.length-1])
      this.source = Tested[Tested.length-1].source;
      this.totalTested = Tested[Tested.length-1].totalsamplestested;
      this.updatedTime = Tested[Tested.length-1].updatetimestamp;
      var APIdata = data.statewise[0];
      console.log(APIdata);
      this.active = APIdata.active;
      this.confirmed = APIdata.confirmed;
      this.deaths = APIdata.deaths;
      this.recovered = APIdata.recovered;
      this.lastupdatedtime = APIdata.lastupdatedtime;
      this.lastupdatedtime = this.lastupdatedtime.substring(3,6)+this.lastupdatedtime.substring(0,3)+this.lastupdatedtime.substring(6);
      this.lastupdatedtime =new Date(this.lastupdatedtime);
    }, error=>{
        this.router.navigate(['/']);
    });
  }

  chartConfirmed = this.service.chart1;
  chartNewConfirmed = this.service.chart2;
  chartDeadVSSafe = this.service.chart3;
  chartNewDeadVSSafe = this.service.chart4;
  GetChart(){

    this.service.GetIndia().subscribe(data=>{
      // var ChartData = data.cases_time_series;
      console.log(data);
      let Confirmed = data["cases_time_series"].map(data => data.totalconfirmed);
      let Deceased = data["cases_time_series"].map(data => data.totaldeceased);
      let Recovered = data["cases_time_series"].map(data => data.totalrecovered);
      let NewDeceased = data["cases_time_series"].map(data => data.dailydeceased);
      let NewConfirmed = data["cases_time_series"].map(data => data.dailyconfirmed);
      let NewRecovered = data["cases_time_series"].map(data => data.dailyrecovered);
      let Dates = data["cases_time_series"].map(data => data.date)
      this.newDeaths  = NewDeceased[NewDeceased.length -1];
      this.newConfirmed  = NewConfirmed[NewConfirmed.length -1];

      let SortedDates = [];
      Dates.forEach((res)=> {
        let jsdate = new Date(res)
        SortedDates.push(jsdate.toLocaleDateString('en',{day:'numeric',month:'short'}))
      });

      this.chartConfirmed = new Chart('canvas1', {
        type:'line',
        data: {
          labels: SortedDates,
          datasets:[
            {
              data: Confirmed,
              borderColor: 'blue',
              fill:false,
              backgroundColor:'#3925eb',
              label: 'Confirmed'
            }
          ],
        },
        options:{
          legend:{
            display:true,
            position:'right'
          },
          title:{
            display: true,
            text: 'Total Confirmed Cases',
            fontSize:15},
          scales:{
            xAxes:[{
              display:true,
              gridLines:{display:false}
            }],
            yAxes:[{
              display: true,
              ticks:{maxTicksLimit:5}
            }]
          }
        }
      })
      this.service.chart1 = this.chartConfirmed;

      this.chartNewConfirmed = new Chart('canvas4', {
        type:'line',
        data: {
          labels: SortedDates,
          datasets:[
            {
              data: NewConfirmed,
              borderColor: 'blue',
              fill:false,
              backgroundColor:'#3925eb',
              label: 'Confirmed'
            }
          ],
        },
        options:{
          legend:{
            display:true,
            position:'right'
          },
          title:{
            display: true,
            text: 'Daily Confirmed Cases',
            fontSize:15},
          scales:{
            xAxes:[{
              display:true,
              gridLines:{display:false}
            }],
            yAxes:[{
              display: true,
              ticks:{maxTicksLimit:5}

            }]
          }
        }
      })
      this.service.chart2 = this.chartNewConfirmed;

      this.chartDeadVSSafe = new Chart('canvas2', {
        type:'line',
        data: {
          labels: SortedDates,
          datasets:[
            {
              data: Recovered,
              borderColor: 'Green',
              fill:false,
              backgroundColor: '#52a352',
              label: 'Recovered'
            },
            {
              data: Deceased,
              borderColor: 'Red',
              fill:false,
              backgroundColor: '#eb3636',
              label: 'Deceased'
            },
          ]
        },
        options:{
          legend:{
            display:true,
            position:'right'
          },
          title:{
            display: true,
            text: 'Total Deceased vs Recovered',
            fontSize:15
          },
          scales:{
            xAxes:[{
              display:true,
              gridLines:{display:false}
            }],
            yAxes:[{
              display:true,
              ticks: {maxTicksLimit:5}
            }]
          }
        }
      })
      this.service.chart3= this.chartDeadVSSafe;

      this.chartNewDeadVSSafe = new Chart('canvas3', {
        type:'line',
        data: {
          labels: SortedDates,
          datasets:[
            {
              data: NewRecovered,
              borderColor: 'Green',
              fill:false,
              backgroundColor: '#52a352',
              label: 'Recovered'
            },
            {
              data: NewDeceased,
              borderColor: 'Red',
              fill:false,
              backgroundColor: '#eb3636',
              label: 'Deceased'
            },
          ]
        },
        options:{

          legend:{
            display:true,
            position:'right'
          },
          title:{
            display: true,
            text: 'Daily Deceased vs Recovered',
            fontSize:15
          },
          scales:{
            xAxes:[{
              display:true,
              gridLines:{display:false}  ,

         }],
            yAxes:[{
              display:true,
              ticks: {maxTicksLimit:5}
            }]
          }
        }
      })
      this.service.chart4=this.chartNewDeadVSSafe;
    });

  }


  tableFlag : boolean = false;
  Table(){
      this.tableFlag =!this.tableFlag;
      if(this.tableFlag)
        this.service.selected = "INDIA - State Wise";
      else
      this.service.selected = "INDIA";
  }

}
