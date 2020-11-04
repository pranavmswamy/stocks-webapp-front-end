import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'
import { NewsapiService } from '../../services/newsapi.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-stock-news',
  templateUrl: './stock-news.component.html',
  styleUrls: ['./stock-news.component.css']
})
export class StockNewsComponent implements OnInit {
  @Input() ticker;
  news;
  constructor(
    private newsapi: NewsapiService,
    private newsModal: NgbModal
  ) { }

  ngOnInit(): void {
    if(this.ticker != undefined) {
      // call newsApi service
      this.newsapi.getNews(this.ticker).subscribe(data => {
        let news_1d = data;
        let news_2d = [];
        let i = 0;
        while(i < news_1d.length) {
          if(i+1 < news_1d.length) {
            news_2d.push([news_1d[i], news_1d[i+1]])
          }
          else {
            break;
          }
          i += 2
        }
        this.news = news_2d;
        //console.log(this.news)
      })
    }
  }
}
