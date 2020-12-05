import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NewsElement } from '../models/newselement';

@Injectable({
  providedIn: 'root'
})
export class NewsapiService {

  //news = [];
  NEWS_API_KEY = "4968ea67234848f890c5464257055d85";
  
  hostUrlAWS = "http://trialnodejsbackend-env.eba-stk2e7fk.us-east-1.elasticbeanstalk.com/"
  hostUrlGCPServerless = "https://us-west2-stocks-app-backend.cloudfunctions.net/"
  
  constructor(
    private http: HttpClient
  ) { }

  getNews(text) {
    let urlLocal = "http://localhost:3000/"
    const newsUrl = `${this.hostUrlGCPServerless}getNews?q=${text}`
    return this.http.get<NewsElement[]>(newsUrl)
  }
}
