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
  hostUrlAWS = "http://trialnodejsbackend-env.eba-stk2e7fk.us-east-1.elasticbeanstalk.com/"
  urlLocal = "http://localhost:3000/"

  constructor(
    private http: HttpClient
  ) { }

  getAutoCompleteOptions(text) {
    const autoCompleteUrl = `${this.hostUrlAWS}autocomplete?query=${text}`
    return this.http.get<AutoCompleteElement[]>(autoCompleteUrl)
  }

  getCompanyDescription(ticker) {
    const companyDescriptionUrl = `${this.hostUrlAWS}company-details?companyName=${ticker}`
    return this.http.get(companyDescriptionUrl)
  }

  getDailyChartData(ticker, date) {
    let resampleFreq = "4min"
    let d = new Date(date);
    //oneDayAgoObj.setDate(oneDayAgoObj.getDate() - 1);
    let today = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    const dailyChartDataUrl = `${this.hostUrlAWS}daily-chart-data?companyName=${ticker}&startDate=${today}&resampleFreq=${resampleFreq}`
    console.log('daily-chart-data - ', dailyChartDataUrl)
    return this.http.get(dailyChartDataUrl)
  }

  getHistoricalData(ticker) {
    // start date - 2 years
    // resampleFreq - 4 min
    let resampleFreq = "daily"
    let curDate = new Date()
    let twoYearsAgo = `${curDate.getFullYear()-2}-${curDate.getMonth()+1}-${curDate.getDate()}`
    console.log('2yrsago-', twoYearsAgo)
    const historicalDataUrl = `${this.hostUrlAWS}historical-data?companyName=${ticker}&startDate=${twoYearsAgo}&resampleFreq=${resampleFreq}`
    console.log('historical data- ', historicalDataUrl)
    return this.http.get(historicalDataUrl)
  }

  getLatestPrice(ticker) {
    const latestPriceUrl = `${this.hostUrlAWS}latest-price?companyName=${ticker}`
    return this.http.get(latestPriceUrl)
  }



}
