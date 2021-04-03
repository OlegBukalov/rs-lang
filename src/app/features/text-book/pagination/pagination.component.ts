import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPaginationOptions } from 'src/app/core/interfaces/ipagination-options';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pageId: number;

  @Input() options: IPaginationOptions;

  @Output() navigate = new EventEmitter<number>();

  navigateClick(pageId: number) {
    this.navigate.emit(pageId);
  }
}
