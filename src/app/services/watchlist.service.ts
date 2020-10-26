import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  watchlist;
  constructor() {
    this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
    if(this.watchlist == undefined) {
      this.watchlist = {}
    } 
  }

  getWatchList() {
    return this.watchlist;
  }

  addToWatchList(ticker) {
    this.watchlist[ticker.toLowerCase()] = "1";
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    console.log("After adding(ls)-", localStorage.getItem('watchlist'))
    console.log('after adding-(in ts)', this.watchlist)
  }

  removeFromWatchList(ticker) {
    if(ticker.toLowerCase() in this.watchlist) {
      delete this.watchlist[ticker.toLowerCase()];
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
      console.log("After removing(ls):", localStorage.getItem('watchlist'))
      console.log('after removing-(in ts)', this.watchlist)
    }
  }
}
