import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() sold = new EventEmitter()
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

  getLastPrice() {
    return parseFloat(this.latestPrice.last).toFixed(2)
  }

  sell(qty) {

    this.portfolio.sellStock(this.ticker.toLowerCase(), parseInt(qty), this.latestPrice.last);
    this.sold.emit();
    this.sellModal.dismissAll()

  }

  openSellModal(content) {

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

    this.sellModal.open(content);
  }
}
