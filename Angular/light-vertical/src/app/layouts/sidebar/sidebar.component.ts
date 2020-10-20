import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() isCondensed = false;
  menu: any;

  @ViewChild('sideMenu', { static: false }) sideMenu: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    this.activateMenu();
  }

  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }

  /**
   * activates the menu item
   */
  activateMenu = () => {
    // render menu
    const links = document.getElementsByClassName('side-nav-link-ref');
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]['pathname']) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active');
      const parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add('in');
        }
        const parent3 = parent2.parentElement;
        if (parent3) {
          parent3.classList.add('active');
          const childAnchor = parent3.querySelector('.has-dropdown');
          if (childAnchor) { childAnchor.classList.add('active'); }
        }

        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add('in');
        }
        const parent5 = parent4.parentElement;
        if (parent5) {
          parent5.classList.add('active');
        }
      }
    }
  }
}
