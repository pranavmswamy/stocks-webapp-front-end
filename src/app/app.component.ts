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

  changeTab(tabValue, ticker?): void {
    this.ticker = ticker
    this.shown = tabValue
    //console.log('In app-component-', tabValue, ticker)
  }



}
