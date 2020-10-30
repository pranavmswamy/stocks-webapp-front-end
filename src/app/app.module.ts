import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatTabsModule } from '@angular/material/tabs'
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';
import { StockSummaryComponent } from './components/stock-summary/stock-summary.component';
import { StockNewsComponent } from './components/stock-news/stock-news.component';
import { StockChartsComponent } from './components/stock-charts/stock-charts.component';
import { StockNewsElementComponent } from './components/stock-news-element/stock-news-element.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { FavoriteStockComponent } from './components/favorite-stock/favorite-stock.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BuyModalComponent } from './components/buy-modal/buy-modal.component';
import { MyStockComponent } from './components/my-stock/my-stock.component';
import { SellModalComponent } from './components/sell-modal/sell-modal.component'
import {HighchartsChartModule } from 'highcharts-angular'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Routes, RouterModule } from '@angular/router'
 

const routes: Routes = [
{ path: '', component: SearchComponent},
{ path: 'watchlist', component: WatchlistComponent},
{ path: 'portfolio', component: PortfolioComponent},
{ path: 'details/:ticker', component: DetailsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavBarComponent,
    FooterComponent,
    DetailsComponent,
    StockSummaryComponent,
    StockNewsComponent,
    StockChartsComponent,
    StockNewsElementComponent,
    WatchlistComponent,
    FavoriteStockComponent,
    PortfolioComponent,
    BuyModalComponent,
    MyStockComponent,
    SellModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatTabsModule,
    HighchartsChartModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
