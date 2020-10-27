import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  myStocks;
  constructor(
    private portfolio: PortfolioService
  ) { }

  ngOnInit(): void {
    this.myStocks = Object.keys(this.portfolio.getPortfolio())
  }

}
