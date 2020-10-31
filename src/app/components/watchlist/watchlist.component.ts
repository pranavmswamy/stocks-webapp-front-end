import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {WatchlistService} from '../../services/watchlist.service'


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  favoriteStocks = [];
  
  private _removedW = new Subject<string>();
  removedFromWatchlist;
  spinnerSpin = true;

  noOfChildrenFinishedLoading = 0;

  constructor(
    private watchlist: WatchlistService
  ) { }

  ngOnInit(): void {
    this.spinnerSpin = true;
    this.noOfChildrenFinishedLoading = 0;
    this.favoriteStocks = Object.keys(this.watchlist.getWatchList()).sort();

    this._removedW.subscribe(message => this.removedFromWatchlist = message);
      this._removedW.pipe(
        debounceTime(5000)
      ).subscribe(() => this.removedFromWatchlist = '');

  }

  changeRemovedFromWatchList(ticker) {
    this._removedW.next(`${ticker.toUpperCase()} removed from watchlist.`)
    // update watchlist service
    this.watchlist.removeFromWatchList(ticker.toLowerCase());
    // update class var favStocks
    this.favoriteStocks = Object.keys(this.watchlist.getWatchList()).sort();
  }

  countFinishedLoadingEvents() {
    this.noOfChildrenFinishedLoading++;
    console.log("Finished loading child comp", this.noOfChildrenFinishedLoading)
    if(this.noOfChildrenFinishedLoading == this.favoriteStocks.length) {
      this.spinnerSpin = false;
      console.log("Set spinner to false at loaded child- ", this.noOfChildrenFinishedLoading)
    }
  }
}
