import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {  } from '@fortawesome/fontawesome-common-types'

@Component({
  selector: 'app-stock-news-element',
  templateUrl: './stock-news-element.component.html',
  styleUrls: ['./stock-news-element.component.css']
})
export class StockNewsElementComponent implements OnInit {
  @Input() newsElement;

  constructor(
    private newsModal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  getFormattedDate(date) {
    let d = new Date(date)
    let formattedDate = `${d.toLocaleString('default', { month: 'long' })} ${d.getDate()}, ${d.getFullYear()}` 
    return formattedDate;
  }

  openNewsModal(content) {
    this.newsModal.open(content);
  }

}
