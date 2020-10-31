import { Component, OnInit } from '@angular/core';
import { TiingoService } from '../../services/tiingo.service'
import { Input } from '@angular/core'
import * as Highcharts from 'highcharts/highstock';
import HC_stock from 'highcharts/modules/stock';
import { interval } from 'rxjs';
HC_stock(Highcharts);

@Component({
  selector: 'app-stock-summary',
  templateUrl: './stock-summary.component.html',
  styleUrls: ['./stock-summary.component.css']
})
export class StockSummaryComponent implements OnInit {
  @Input() ticker;
  @Input() latestPrice;
  @Input() companyDescription;
  charts_data;

  //chart properties
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'stockChart';
  chartOptions: Highcharts.Options = {};
  updateFlag: boolean = false;

  constructor(
    private tiingo: TiingoService
  ) { }

  ngOnInit(): void {

    if( this.ticker != undefined && this.latestPrice != undefined) {


        // call daily chart data from tiingo 
        this.tiingo.getDailyChartData(this.ticker, this.latestPrice.timestamp).subscribe(data => {
          this.charts_data = data;
  
          // have to convert time in UTC to time in milliseconds. So, convert and reassign to charts_data.
          let  timeConvertedPriceData = [];
          for(let i=0; i<this.charts_data.length; i++) {
              var currentTime = new Date(this.charts_data[i][0])
              var convertedTime = Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours()-9, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());         
              timeConvertedPriceData[i] = [convertedTime, this.charts_data[i][1]]
          }
          // reassign
          this.charts_data = timeConvertedPriceData;
          //console.log("inside fn-",this.charts_data)
  
          let changeColor = ""
          if(this.latestPrice.last - this.latestPrice.prevClose > 0) {
            changeColor = 'green';
          }
          else if(this.latestPrice.last - this.latestPrice.prevClose < 0) {
            changeColor = 'red';
          }
          else {
            changeColor = 'black';
          }
  
          this.chartOptions = {
    
            title: {
                text: this.ticker.toUpperCase()
            },
            
            rangeSelector: {
              enabled: false
            },
    
            series: [{
                name: 'AAPL',
                type:'line',
                color: changeColor,
                data: this.charts_data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        }
        this.updateFlag = true;
        })



      
      interval(0.25*60*1000).subscribe(() => {



        // call daily chart data from tiingo 
      this.tiingo.getDailyChartData(this.ticker, this.latestPrice.timestamp).subscribe(data => {
        this.charts_data = data;

        // have to convert time in UTC to time in milliseconds. So, convert and reassign to charts_data.
        let  timeConvertedPriceData = [];
        for(let i=0; i<this.charts_data.length; i++) {
            var currentTime = new Date(this.charts_data[i][0])
            var convertedTime = Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours()-9, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());         
            timeConvertedPriceData[i] = [convertedTime, this.charts_data[i][1]]
        }
        // reassign
        this.charts_data = timeConvertedPriceData;

        //var half_length = Math.ceil(this.charts_data.length / 2);    
        //this.charts_data = this.charts_data.splice(half_length, this.charts_data.length);
        //console.log("inside fn-",this.charts_data)

        let changeColor = ""
        if(this.latestPrice.last - this.latestPrice.prevClose > 0) {
          changeColor = 'green';
        }
        else if(this.latestPrice.last - this.latestPrice.prevClose < 0) {
          changeColor = 'red';
        }
        else {
          changeColor = 'black';
        }

        this.chartOptions = {
  
          title: {
              text: this.ticker.toUpperCase()
          },
          
          rangeSelector: {
            enabled: false
          },
  
          series: [{
              name: 'AAPL',
              type:'line',
              color: changeColor,
              data: this.charts_data,
              tooltip: {
                  valueDecimals: 2
              }
          }]
      }
      this.updateFlag = true;
      })





      })
    }
  }
}
