import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'
import { AutoCompleteElement } from '../models/autocompleteelement'

@Injectable({
  providedIn: 'root'
})
export class TiingoService {
  TIINGO_API_KEY: String = "c6945fbdf54d1d8f82a44716ac4de3338e027db5" 
  autoCompelete = [];

  constructor(
    private http: HttpClient
  ) { }

  getAutoCompleteOptions(text) {
    const autoCompleteUrl = `http://localhost:3000/autocomplete?query=${text}`
    return this.http.get<AutoCompleteElement[]>(autoCompleteUrl)
  }

}
