import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  isCondensed = false;

  constructor() { }

  ngOnInit() {
  }

  isMobile() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  }

  ngAfterViewInit() {
    document.body.classList.remove('authentication-bg');
    document.body.classList.remove('authentication-bg-pattern');

    if (!this.isMobile()) {
      document.body.classList.add('sidebar-enable');
    }
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    document.body.classList.toggle('sidebar-enable');
    if (!this.isMobile()) {
      document.body.classList.toggle('enlarged');
      this.isCondensed = !this.isCondensed;
    }
  }
}
