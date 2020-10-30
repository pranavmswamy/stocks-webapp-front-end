import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { PortfolioService } from '../../services/portfolio.service'

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {
  @Input() companyDescription;
  @Input() latestPrice;
  @Output() boughtEvent = new EventEmitter();
  numberOfSharesModalValue = '';
  constructor(
    private buyModal: NgbModal,
    private portfolio: PortfolioService
  ) { }

  ngOnInit(): void {
  }

  openBuyModal(content) {
    this.buyModal.open(content).result.then(() => {
      this.boughtEvent.emit();
    });
  }


  calcTotalAndEnableBuy(value) {
    this.numberOfSharesModalValue = value;
    console.log(value)
  }

  addToPortfolio(numStocks) {
    
    this.portfolio.addStock(this.companyDescription.ticker.toLowerCase(), this.latestPrice.last, parseInt(numStocks));
  }

}
