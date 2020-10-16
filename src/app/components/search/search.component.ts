import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  @Output() searchClicked = new EventEmitter()
  searchForm = new FormControl()
  autoCompleteOptions = ["AAPL", "GOOG", "NFLX"]

  constructor() { }

  ngOnInit(): void {
  }

  onSearchClick(newView: string): void {
    this.searchClicked.emit(newView);
  }
}
