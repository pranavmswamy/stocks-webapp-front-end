import { Component, OnInit, Input } from '@angular/core';
import {WatchlistService} from '../../services/watchlist.service'


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  @Input() ticker;
  favoriteStocks;
  

  constructor(
    private watchlist: WatchlistService
  ) { }

  ngOnInit(): void {
    this.favoriteStocks = Object.keys(this.watchlist.getWatchList());
    
    

  }

}
