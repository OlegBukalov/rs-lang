import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFullscreen]',
})
export class FullscreenDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event']) onClick(event) {
    const elementToFullscreen = this.renderer.parentNode(event.target);
    elementToFullscreen.requestFullScreen();
  }
}
