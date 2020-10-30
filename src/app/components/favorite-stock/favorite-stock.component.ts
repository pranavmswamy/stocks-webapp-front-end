import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';
import {TiingoService} from '../../services/tiingo.service'

@Component({
  selector: 'app-favorite-stock',
  templateUrl: './favorite-stock.component.html',
  styleUrls: ['./favorite-stock.component.css']
})
export class FavoriteStockComponent implements OnInit {
  
  @Input() ticker;
  companyDescription;
  latestPrice;
  @Output() finishedLoading = new EventEmitter();

  constructor(
    private tiingo: TiingoService
  ) { }

  ngOnInit(): void {

    if(this.ticker != undefined) {
      // call latest price
      this.tiingo.getLatestPrice(this.ticker).subscribe(data => {
        this.latestPrice = data;
        
        // call companyDesc; calling it nested to pass finishedLoading event emitter
        this.tiingo.getCompanyDescription(this.ticker).subscribe(data => {
          this.companyDescription = data;

          this.finishedLoading.emit()

        })
      
      })

      // call every 30s
      interval(0.5*60*1000).subscribe(() => {
        this.tiingo.getLatestPrice(this.ticker).subscribe(data => {
          this.latestPrice = data;
          console.log("Updating price for", this.ticker, this.latestPrice.last)
        })
      })
      
    }

  }

  getPriceChange() {
    return (this.latestPrice.last - this.latestPrice.prevClose).toFixed(2);
  }

  getPriceChangePercent() {
    return (((this.latestPrice.last - this.latestPrice.prevClose)*100)/this.latestPrice.prevClose).toFixed(2);
  }

}
