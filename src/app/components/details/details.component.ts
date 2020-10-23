import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../../services/newsapi.service'
import { TiingoService } from '../../services/tiingo.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    private newsapi : NewsapiService,
    private tiingo: TiingoService
  ) { }

  ngOnInit(): void {
  }

}
