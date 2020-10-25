import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../../services/newsapi.service'
import { TiingoService } from '../../services/tiingo.service'
import { Input } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  @Input() ticker;
  companyDescription;
  news;
  dailyChartData;
  historicalData;
  latestPrice;
  
  numberOfSharesModalValue = '';

  constructor(
    private newsapi : NewsapiService,
    private tiingo: TiingoService,
    private buyModal: NgbModal
  ) { }

  ngOnInit(): void {
    if(this.ticker != "") {
      // call getCompanyDescription from tiingo service
      this.tiingo.getCompanyDescription(this.ticker).subscribe(data => {
        this.companyDescription = data;
      })

      // call daily chart data from tiingo 
      this.tiingo.getDailyChartData(this.ticker).subscribe(data => {
        this.dailyChartData = data;
      })

      this.tiingo.getHistoricalData(this.ticker).subscribe(data => {
        this.historicalData = data;
      })

      this.tiingo.getLatestPrice(this.ticker).subscribe(data => {
        this.latestPrice = data;
      })
    } 
  }

  getCurrentTimestamp(): string {
    let currentTime = new Date()
    return currentTime.toISOString().substring(0,10) + " " + currentTime.toISOString().substring(11,19);
  }

  openBuyModal(content) {
    this.buyModal.open(content);
  }

  calcTotalAndEnableBuy(value) {
      this.numberOfSharesModalValue = value;
      console.log(value)
    }
}
