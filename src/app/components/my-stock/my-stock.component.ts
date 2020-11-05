import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { interval } from 'rxjs';
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
  @Output() finishedLoading = new EventEmitter()
  @Output() updateMyStocks = new EventEmitter()
  @Input() reload;

  constructor(
    private tiingo: TiingoService,
    private portfolio: PortfolioService
  ) { }

  ngOnInit(): void {
    if(this.ticker != undefined) {
       // call latest price
       this.tiingo.getLatestPrice(this.ticker).subscribe(data => {
        this.latestPrice = data;

        this.finishedLoading.emit()

        console.log('entered my-stock and updated latestPrice and companyDesc for', this.ticker, this.latestPrice.last)

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
      
      // call companyDesc
      this.tiingo.getCompanyDescription(this.ticker).subscribe(data => {
        this.companyDescription = data;
      })
    }
  }

  ngOnChanges(): void {
    if(this.reload == true) {
      console.log("Reload onChanges in Portfolio Working")
      this.ngOnInit()
      this.reload = false
    }
  }

  getLastPrice() {
    return parseFloat(this.latestPrice.last).toFixed(2)
  }


  getPriceChange() {
    return (this.latestPrice.last - this.latestPrice.prevClose).toFixed(2);
  }

  getQuantity() {
    return this.portfolio.getPortfolio()[this.ticker]['quantity'];
  }

  getAvgCost() {
    // js can do string/string numeric division
    return this.portfolio.getPortfolio()[this.ticker]['totalcost'] / this.portfolio.getPortfolio()[this.ticker]['quantity'];
  }

  getTotalCost() {
    return this.portfolio.getPortfolio()[this.ticker]['totalcost']
  }

  emitUpdateMyStocks() {
    this.updateMyStocks.emit();
  }


}
