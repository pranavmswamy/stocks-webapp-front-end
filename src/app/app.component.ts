import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stocks-website';
  shown = "SEARCH"
  ticker: String;
  currentActive = 'search';

  changeTab(tabValue, ticker?): void {
    this.ticker = ticker
    this.shown = tabValue
    //console.log('In app-component-', tabValue, ticker)
  }


  changeCurrentActive(tab) {
    this.currentActive = tab;
    console.log("-----", this.currentActive, this.currentActive.constructor.name)
  }

}
