import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    private tiingo: TiingoService
  ) { }

  ngOnInit(): void {

    if(this.ticker != undefined) {
      // call latest price
      this.tiingo.getLatestPrice(this.ticker).subscribe(data => {
        this.latestPrice = data;
      })
      
      // call companyDesc
      this.tiingo.getCompanyDescription(this.ticker).subscribe(data => {
        this.companyDescription = data;
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
