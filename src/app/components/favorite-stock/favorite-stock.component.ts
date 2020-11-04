import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { interval } from 'rxjs';
import {TiingoService} from '../../services/tiingo.service'

@Component({
  selector: 'app-favorite-stock',
  templateUrl: './favorite-stock.component.html',
  styleUrls: ['./favorite-stock.component.css']
})
export class FavoriteStockComponent implements OnInit, OnChanges {
  
  @Input() ticker;
  companyDescription;
  latestPrice;
  @Output() finishedLoading = new EventEmitter();
  @Input() reload;
  

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

          console.log('entered fav-stock and updated latestPrice and companyDesc for ', this.ticker, this.latestPrice.last)

        })


        /*if(this.latestPrice.bidPrice != null) {
          // call every 30s
          interval(0.5*60*1000).subscribe(() => {
            this.tiingo.getLatestPrice(this.ticker).subscribe(data => {
              this.latestPrice = data;
              console.log("Updating price for", this.ticker, this.latestPrice.last)
            })
          })
        }*/
      })
      
    }

  }

  ngOnChanges() : void {

    if(this.reload == true) {
      console.log("Reload onChanges Working")
      this.ngOnInit()
      this.reload = false
    }
  }

  getPriceChange() {
    return (this.latestPrice.last - this.latestPrice.prevClose).toFixed(2);
  }

  getPriceChangePercent() {
    return (((this.latestPrice.last - this.latestPrice.prevClose)*100)/this.latestPrice.prevClose).toFixed(2);
  }

}
