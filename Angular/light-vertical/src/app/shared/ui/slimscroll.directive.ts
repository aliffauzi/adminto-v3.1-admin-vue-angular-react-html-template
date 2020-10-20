import { Directive, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';

@Directive({
  selector: '[appSlimScroll]'
})
export class SlimscrollDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    // smooth scroll
    Scrollbar.init(this.el.nativeElement);
  }

}
