import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  portfolio;
  constructor() { 
    let portfolio = localStorage.getItem('portfolio');
    if(portfolio != undefined) {
      this.portfolio = JSON.parse(portfolio);
    }
    else {
      this.portfolio = {};
    }
  }

  getPortfolio() {
    return this.portfolio;
  }

  addStock(ticker, price: number, quantity: number) {
    if(ticker in this.portfolio) {
      this.portfolio[ticker]["totalcost"] += quantity*price;
      this.portfolio[ticker]["quantity"] += quantity;
    }
    else {
      this.portfolio[ticker]= {}
      this.portfolio[ticker]["totalcost"] = quantity*price;
      this.portfolio[ticker]["quantity"] = quantity;
    }

    localStorage.setItem('portfolio', JSON.stringify(this.portfolio));
    console.log("After buying - ts-", this.portfolio)
    console.log("locals-", localStorage.getItem('portfolio'));
  }

  sellStock(ticker, quantity, sellPrice) {
    if(ticker in this.portfolio) {
      this.portfolio[ticker]["quantity"] -= quantity;
      this.portfolio[ticker]["totalcost"] -= sellPrice*quantity;

      if(this.portfolio[ticker]["quantity"] <= 0) {
        delete this.portfolio[ticker];
      }
    }

    localStorage.setItem('portfolio', JSON.stringify(this.portfolio))

    console.log("After selling - ts-", this.portfolio)
    console.log("locals-", localStorage.getItem('portfolio'));

  }

}
