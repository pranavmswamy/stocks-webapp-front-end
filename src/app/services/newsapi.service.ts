import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NewsElement } from '../models/newselement';

@Injectable({
  providedIn: 'root'
})
export class NewsapiService {

  news = [];
  NEWS_API_KEY = "4968ea67234848f890c5464257055d85";
  constructor(
    private http: HttpClient
  ) { }

  getNews(text) {
    const newsUrl = `http://localhost:3000/news?q=${text}`
    return this.http.get<NewsElement[]>(newsUrl)
  }
}
