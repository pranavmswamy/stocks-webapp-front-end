import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { TiingoService } from '../../services/tiingo.service'
@Component({
  selector: 'app-my-stock',
  templateUrl: './my-stock.component.html',
  styleUrls: ['./my-stock.component.css']
})
export class MyStockComponent implements OnInit {
  @Input() ticker;
  companyDescription;
  latestPrice;

  constructor(
    private tiingo: TiingoService,
    private portfolio: PortfolioService
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

  getQuantity() {
    return this.portfolio.getPortfolio()[this.ticker]['quantity'];
  }

  getAvgCost() {
    // js can do string/string numeric division
    return this.portfolio.getPortfolio()[this.ticker]['totalcost'] / this.portfolio.getPortfolio()[this.ticker]['totalcost'];
  }

  getTotalCost() {
    return this.portfolio.getPortfolio()[this.ticker]['totalcost']
  }


}
