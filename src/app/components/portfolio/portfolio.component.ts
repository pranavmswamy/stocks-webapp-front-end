import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  myStocks;

  @Output() currentTab = new EventEmitter();

  spinnerSpin = true;
  noOfChildrenLoaded = 0;

  reload = false

  constructor(
    private portfolio: PortfolioService
  ) { }

  ngOnInit(): void {
    this.currentTab.emit('portfolio');
    this.spinnerSpin = true;
    this.myStocks = []
    this.myStocks = Object.keys(this.portfolio.getPortfolio()).sort()
  }

  countFinishedLoadingChildren() {
    this.noOfChildrenLoaded++;
    console.log("Finished loading child comp", this.noOfChildrenLoaded)
    if(this.noOfChildrenLoaded == this.myStocks.length) {
      this.spinnerSpin = false;
      console.log("Set spinner to false at loaded child- ", this.noOfChildrenLoaded)
    }
  }

  updateMyStocks() {
    this.myStocks = []
    this.myStocks = Object.keys(this.portfolio.getPortfolio()).sort();
    
    this.reload = true;
    setTimeout(()=> {
      this.reload = false;
    }, 100)
  }
  
  ngOnChanges() : void {

  }

}
