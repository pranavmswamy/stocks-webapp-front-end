import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { TiingoService } from '../../services/tiingo.service'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  @Output() searchClicked = new EventEmitter()
  @Output() goToDetailsEvent = new EventEmitter()
  @Output() currentTab = new EventEmitter()
  searchForm = new FormControl()
  autoCompleteOptions = [];

  constructor(
    private tiingo: TiingoService
  ) { }

  ngOnInit(): void {
    this.currentTab.emit('search');
  }

  goToDetailsView(details: String): void {
    this.goToDetailsEvent.emit(details)
  }

  onSearchClick(ticker: string): void {
    // go to details route with ticker as param.
    this.searchClicked.emit(ticker);
  }


  onTyped(text) {
    setTimeout(() => {},1000);
    if(text != "") {
      this.tiingo.getAutoCompleteOptions(text).subscribe(data => {
        this.autoCompleteOptions = data;
      })
    }
    else {
      this.autoCompleteOptions = [];
    } 
  }

  checkIfEmpty(text) {
    if(text == "") {
      console.log("entered empty ")
      this.autoCompleteOptions = [];
    } 
  }
}
