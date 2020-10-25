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
import { StockChartsComponent } from './components/stock-charts/stock-charts.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavBarComponent,
    FooterComponent,
    DetailsComponent,
    StockSummaryComponent,
    StockNewsComponent,
    StockChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
