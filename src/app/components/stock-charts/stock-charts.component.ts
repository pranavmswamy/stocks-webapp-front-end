import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock'
import { TiingoService } from 'src/app/services/tiingo.service';
import HC_stock from 'highcharts/modules/stock';
import IndicatorsCore from 'highcharts/indicators/indicators';
import vbp from 'highcharts/indicators/volume-by-price';

HC_stock(Highcharts);
IndicatorsCore(Highcharts)
vbp(Highcharts)

@Component({
  selector: 'app-stock-charts',
  templateUrl: './stock-charts.component.html',
  styleUrls: ['./stock-charts.component.css']
})
export class StockChartsComponent implements OnInit {
  @Input() ticker;
  historicalData;

  //chart properties
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'stockChart';
  updateFlag: boolean = false;
  
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  }; 

  constructor(
    private tiingo: TiingoService
  ) { }

  ngOnInit(): void {
    
    if(this.ticker != undefined) {
      this.tiingo.getHistoricalData(this.ticker).subscribe(data => {
      
        this.historicalData = data;
  
        console.log(this.historicalData)
  
        let ohlc = []
        let volume = []
        let spline_data = []
        var groupingUnits = []
        groupingUnits.push(['week',[1]]);
        groupingUnits.push(['month',[1, 2, 3, 4, 6]]);
  
        for(let i=0; i<this.historicalData.length; i++) {
          let currentTime = new Date(this.historicalData[i]['date'])
          let convertedTime = Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours()-9, currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
          ohlc.push([
            convertedTime,
            this.historicalData[i]['open'],
            this.historicalData[i]['high'],
            this.historicalData[i]['low'],
            this.historicalData[i]['close']
          ])
  
          volume.push([
            convertedTime,
            parseInt(this.historicalData[i]['volume'])
          ])

          spline_data.push([
            convertedTime,
            this.historicalData[i]['close']
          ])
        }
  
        console.log("ohlc data- ")
        console.log(ohlc)
  
        console.log("vol data-")
        console.log(volume)
        
        this.chartOptions = {

          rangeSelector: {
              selected: 2
          },
  
          title: {
              text: `${this.ticker.toUpperCase()} Historical`
          },
  
          subtitle: {
              text: 'With SMA and Volume by Price technical indicators'
          },
  
          yAxis: [{
              startOnTick: false,
              endOnTick: false,
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'OHLC'
              },
              height: '60%',
              lineWidth: 2,
              resize: {
                  enabled: true
              }
          }, {
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'Volume'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
          }],
  
          tooltip: {
              split: true
          },
  
          plotOptions: {
              series: {
                  dataGrouping: {
                      units: groupingUnits
                  }
              }
          },
  
          series: [{
              type: 'candlestick',
              name: this.ticker.toUpperCase(),
              id: 'aapl',
              zIndex: 2,
              data: ohlc
          }, {
              type: 'column',
              name: 'Volume',
              id: 'volume',
              data: volume,
              yAxis: 1
          }, {
              type: 'vbp',
              linkedTo: 'aapl',
              params: {
                  volumeSeriesID: 'volume'
              },
              dataLabels: {
                  enabled: false
              },
              zoneLines: {
                  enabled: false
              }
          }, {
              type: 'sma',
              linkedTo: 'aapl',
              zIndex: 1,
              marker: {
                  enabled: false
              }
          }]
      };
  
      this.updateFlag = true;
  
      console.log("chart options inited")
  
      })
  
    }
  }

}
