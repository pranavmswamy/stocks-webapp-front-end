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

  getCompanyDescription(ticker) {
    const companyDescriptionUrl = `http://localhost:3000/company-details?companyName=${ticker}`
    return this.http.get(companyDescriptionUrl)
  }

  getDailyChartData(ticker) {
    let resampleFreq = "1min"
    let oneDayAgoObj = new Date();
    oneDayAgoObj.setDate(oneDayAgoObj.getDate() - 1);
    let oneDayAgo = `${oneDayAgoObj.getFullYear()}-${oneDayAgoObj.getMonth()+1}-${oneDayAgoObj.getDate()}`
    const dailyChartDataUrl = `http://localhost:3000/daily-chart-data?companyName=${ticker}&startDate=${oneDayAgo}&resampleFreq=${resampleFreq}`
    console.log('daily-chart-data - ', dailyChartDataUrl)
    return this.http.get(dailyChartDataUrl)
  }

  getHistoricalData(ticker) {
    // start date - 2 years
    // resampleFreq - 4 min
    let resampleFreq = "daily"
    let curDate = new Date()
    let twoYearsAgo = `${curDate.getFullYear()-2}-${curDate.getMonth()+1}-${curDate.getDate()}`
    const historicalDataUrl = `http://localhost:3000/historical-data?companyName=${ticker}&startDate=${twoYearsAgo}&resampleFreq=${resampleFreq}`
    console.log('historical data- ', historicalDataUrl)
    return this.http.get(historicalDataUrl)
  }

  getLatestPrice(ticker) {
    const latestPriceUrl = `http://localhost:3000/latest-price?companyName=${ticker}`
    return this.http.get(latestPriceUrl)
  }



}
