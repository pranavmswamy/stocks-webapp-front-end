import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() tabClicked = new EventEmitter()
  activeTab = "SEARCH" // not reqd actually, can directly send through parameter passed to tabChange()

  port = false;
  watch = false;
  search = true;

  constructor() { }

  ngOnInit(): void {
  }

  tabChange(tab): void {
    this.activeTab = tab;
    this.tabClicked.emit(this.activeTab);
  }

}
