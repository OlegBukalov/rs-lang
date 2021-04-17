import { Directive, ElementRef, HostListener } from '@angular/core';
import { ToasterService } from '../services/toaster.service';

@Directive({
  selector: '[appFullscreen]',
})
export class FullscreenDirective {
  constructor(private element: ElementRef, private toaster: ToasterService) {}

  @HostListener('click') onClick() {
    const elementToFullscreen = this.element.nativeElement.parentNode;

    if (!document.fullscreenElement) {
      elementToFullscreen.requestFullscreen().catch((err) => {
        this.toaster.showError(`Что-то пошло не так.`, `Ошибка! ${err}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}
