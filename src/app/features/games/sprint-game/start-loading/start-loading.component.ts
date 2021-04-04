import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';

const MaxSeconds = 3;

@Component({
  selector: 'app-start-loading',
  templateUrl: './start-loading.component.html',
  styleUrls: ['./start-loading.component.scss'],
})
export class StartLoadingComponent implements OnInit {
  @Output() startLoadingEnd = new EventEmitter();

  curSecond = MaxSeconds;

  ngOnInit(): void {
    const timer$ = interval(1000);
    const sub = timer$.subscribe((sec) => {
      if (MaxSeconds - 1 === sec) {
        sub.unsubscribe();
        this.startLoadingEnd.emit();
      }
      this.curSecond -= 1;
    });
  }
}
