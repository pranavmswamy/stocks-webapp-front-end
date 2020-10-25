import { Component, OnInit } from '@angular/core';
import { TiingoService } from '../../services/tiingo.service'
import { Input } from '@angular/core'

@Component({
  selector: 'app-stock-summary',
  templateUrl: './stock-summary.component.html',
  styleUrls: ['./stock-summary.component.css']
})
export class StockSummaryComponent implements OnInit {
  @Input() ticker;
  latestPrice;
  companyDescription;

  constructor(
    private tiingo: TiingoService
  ) { }

  ngOnInit(): void {

    if( this.ticker != undefined) {
      
      // call latest price from tingo service
      this.tiingo.getLatestPrice(this.ticker).subscribe(data => {
        this.latestPrice = data;
      })
      
      // call getCompanyDescription from tiingo service
      this.tiingo.getCompanyDescription(this.ticker).subscribe(data => {
        this.companyDescription = data;
      })
    }
  }

}
