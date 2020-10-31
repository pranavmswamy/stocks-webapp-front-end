import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  myStocks;

  spinnerSpin = true;
  noOfChildrenLoaded = 0;

  constructor(
    private portfolio: PortfolioService
  ) { }

  ngOnInit(): void {
    this.spinnerSpin = true;
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
    this.myStocks = Object.keys(this.portfolio.getPortfolio()).sort();
  }

}
