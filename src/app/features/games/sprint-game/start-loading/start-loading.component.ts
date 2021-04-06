import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';
import { map, finalize, take } from 'rxjs/operators';

const MAX_SECONDS = 3;

@Component({
  selector: 'app-start-loading',
  templateUrl: './start-loading.component.html',
  styleUrls: ['./start-loading.component.scss'],
})
export class StartLoadingComponent implements OnInit {
  @Output() startLoadingEnd = new EventEmitter();

  curSecond = MAX_SECONDS;

  ngOnInit(): void {
    interval(1000)
      .pipe(
        map((counter: number) => MAX_SECONDS - counter),
        take(MAX_SECONDS),
        finalize(() => this.startLoadingEnd.emit()),
      )
      .subscribe(() => {
        this.curSecond -= 1;
      });
  }
}
