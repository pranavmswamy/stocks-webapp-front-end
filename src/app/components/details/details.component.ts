import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../../services/newsapi.service'
import { TiingoService } from '../../services/tiingo.service'
import { Input } from '@angular/core'
import { WatchlistService } from '../../services/watchlist.service'

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

  favorite = false;

  constructor(
    private newsapi : NewsapiService,
    private tiingo: TiingoService,
    private watchlist: WatchlistService
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

      if(this.ticker.toLowerCase() in this.watchlist.getWatchList()) {
        this.favorite = true;
      }
      else {
        this.favorite = false;
      }
    }
  }

  getCurrentTimestamp(): string {
    let currentTime = new Date()
    return currentTime.toISOString().substring(0,10) + " " + currentTime.toISOString().substring(11,19);
  }

  getPriceChange() {
    return (this.latestPrice.last - this.latestPrice.prevClose).toFixed(2);
  }

  getPriceChangePercent() {
    return (((this.latestPrice.last - this.latestPrice.prevClose)*100)/this.latestPrice.prevClose).toFixed(2);
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
    
    if(this.favorite == true) {
      this.watchlist.addToWatchList(this.ticker);
    }
    else {
      this.watchlist.removeFromWatchList(this.ticker);
    }
  }
}
