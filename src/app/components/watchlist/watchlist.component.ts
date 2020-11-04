import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  reload = false;

  private _removedW = new Subject<string>();
  removedFromWatchlist;
  spinnerSpin = true;

  @Output() currentTab = new EventEmitter();

  noOfChildrenFinishedLoading = 0;

  constructor(
    private watchlist: WatchlistService,
  ) { }

  ngOnInit(): void {
    this.currentTab.emit('watchlist');
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
    this.favoriteStocks = [];
    this.favoriteStocks = Object.keys(this.watchlist.getWatchList()).sort();

    this.reload = true;
    setTimeout(()=> {
      this.reload = false;
    }, 100)

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
