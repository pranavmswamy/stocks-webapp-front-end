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

  autoCompleteLoading = false;

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


  onTyped(text1) {
    //this.autoCompleteOptions = [];
    
    setTimeout(()=> {}, 2000)
    let text = text1
    if(text != "") {
      this.autoCompleteLoading = true;
      this.tiingo.getAutoCompleteOptions(text).subscribe(data => {
        this.autoCompleteOptions = data;
        this.autoCompleteLoading = false;
      })
    }
    else {
      this.autoCompleteLoading = false;
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
