import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TiingoService } from '../../services/tiingo.service'
import { Input } from '@angular/core'
import { WatchlistService } from '../../services/watchlist.service'
import { Observable, Subject, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { interval } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit, OnDestroy {
  @Input() ticker;
  companyDescription;
  news;
  latestPrice;
  currentTime;
  validStock = true;

  private price_subscribe: Subscription;

  @Output() currentTab = new EventEmitter()

  private _success = new Subject<string>();
  private _addedW = new Subject<string>();
  private _removedW = new Subject<string>();
  favorite = false;
  boughtStockSuccess = "";
  addedToWatchlist = "";
  removedFromWatchlist = "";

  constructor(
    private tiingo: TiingoService,
    private watchlist: WatchlistService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentTab.emit('details')

    this.route.paramMap.subscribe(params => {
      this.ticker = params.get('ticker');
    })

    if(this.ticker != "") {
      // call getCompanyDescription from tiingo service
      this.tiingo.getCompanyDescription(this.ticker).subscribe(data => {
        this.companyDescription = data;
        if('detail' in this.companyDescription) {
          this.validStock = false;
        }
        else {
          this.validStock = true;
        }
      })

      // call first time
      this.tiingo.getLatestPrice(this.ticker).subscribe(data => {
        this.latestPrice = data;
        console.log(this.latestPrice.last)

        if(this.latestPrice.bidPrice != null) { 
          // call every 30s
          this.price_subscribe = interval(0.25*60*1000).subscribe(() => {
            this.tiingo.getLatestPrice(this.ticker).subscribe(data => {
              this.latestPrice = data;
              console.log(this.latestPrice.last)
            })
            this.currentTime = this.getCurrentTimestamp();
            console.log("Called every 15s")
          })
        }
      })

      if(this.ticker.toLowerCase() in this.watchlist.getWatchList()) {
        this.favorite = true;
      }
      else {
        this.favorite = false;
      }

      this.currentTime = this.getCurrentTimestamp();
      
      this._success.subscribe(message => this.boughtStockSuccess = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.boughtStockSuccess = '');

      this._addedW.subscribe(message => this.addedToWatchlist = message);
      this._addedW.pipe(
        debounceTime(5000)
      ).subscribe(() => this.addedToWatchlist = '');

      this._removedW.subscribe(message => this.removedFromWatchlist = message);
      this._removedW.pipe(
        debounceTime(5000)
      ).subscribe(() => this.removedFromWatchlist = '');



    }
    else {
      this.validStock = false;
    }
  }

  ngOnDestroy(): void {
    this.price_subscribe.unsubscribe()
  }

  changeSuccessMessage() {
    this._success.next(`${this.ticker.toUpperCase()} stocks bought successfully`);
  }

  changeAddedToWatchList() {
    this._addedW.next(`${this.ticker.toUpperCase()} added to watchlist.`)

  }

  changeRemovedFromWatchList() {
    this._removedW.next(`${this.ticker.toUpperCase()} removed from watchlist.`)
  }

  getCurrentTimestamp(): string {
    let currentTime = new Date()
    return currentTime.toISOString().substring(0,10) + " " + currentTime.toTimeString().substring(0,8)
  }

  getLastOpenTimeStamp(): string {
    let lastOpen = new Date(this.latestPrice.timestamp)
    return lastOpen.toISOString().substring(0,10) + " " + lastOpen.toTimeString().substring(0,8);
  }

  getPriceChange() {
    return (this.latestPrice.last - this.latestPrice.prevClose).toFixed(2);
  }

  getPriceChangePercent() {
    return (((this.latestPrice.last - this.latestPrice.prevClose)*100)/this.latestPrice.prevClose).toFixed(2);
  }

  getLatestPriceLast() {
    let p = parseFloat(this.latestPrice.last)
    return p.toFixed(2)
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
    
    if(this.favorite == true) {
      this.watchlist.addToWatchList(this.ticker);
    }
    else {
      this.watchlist.removeFromWatchList(this.ticker);
    }
  }
}
