import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-book',
  templateUrl: './text-book.component.html',
  styleUrls: ['./text-book.component.scss'],
})
export class TextBookComponent {
  constructor(private router: Router) {}

  toSettings() {
    this.router.navigate(['settings']);
  }
}
