import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioService } from '../../services/portfolio.service'

@Component({
  selector: 'app-sell-modal',
  templateUrl: './sell-modal.component.html',
  styleUrls: ['./sell-modal.component.css']
})
export class SellModalComponent implements OnInit {
  @Input() latestPrice;
  @Input() ticker;
  qtyLimit = 0;
  numberOfSharesModalValue = 0;
  constructor(
    private portfolio: PortfolioService,
    private sellModal: NgbModal
  ) { }

  ngOnInit(): void {

    console.log(this.ticker)
    if(this.ticker != undefined) {
      if(this.ticker.toLowerCase() in this.portfolio.getPortfolio()) {
        console.log("entered")
        this.qtyLimit = parseInt(this.portfolio.getPortfolio()[this.ticker]["quantity"]);
        console.log(this.qtyLimit)
      }
      else {
        console.log("did not enter")
        this.qtyLimit = 0;
      }
      console.log(this.portfolio.getPortfolio())
    }

  }

  calcTotalAndEnableSell(qty) {
    if(qty == '') {
      this.numberOfSharesModalValue = 0;
    }
    else {
      this.numberOfSharesModalValue = parseInt(qty);
    }
    console.log(this.numberOfSharesModalValue)
    console.log("limit-", this.qtyLimit)
  }

  sell(qty) {

    this.portfolio.sellStock(this.ticker.toLowerCase(), parseInt(qty), this.latestPrice.last);

  }

  openSellModal(content) {
    this.sellModal.open(content);
  }
}
