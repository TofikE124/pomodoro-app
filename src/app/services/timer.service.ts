import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timeLeftSubject = new BehaviorSubject<number>(0);
  timeLeft$ = this.timeLeftSubject.asObservable();
  private timerSubscription?: Subscription;
  timerComplete = new EventEmitter<void>();

  startTimer(duration: number) {
    this.clearTimer();
    this.timeLeftSubject.next(duration);
    this.timerSubscription = interval(1000)
      .pipe(map(() => -1))
      .subscribe((decrement) => {
        const newTimeLeft = this.timeLeftSubject.value + decrement;
        if (newTimeLeft >= 0) {
          this.timeLeftSubject.next(newTimeLeft);
          if (newTimeLeft == 0) this.timerComplete.emit();
        } else {
          this.clearTimer();
        }
      });
  }

  clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  resetTimer(duration: number) {
    this.clearTimer();
    this.startTimer(duration);
    this.pauseTimer();
  }

  pauseTimer() {
    this.clearTimer();
  }

  resumeTimer() {
    const remainingTime = this.timeLeftSubject.value;
    this.startTimer(remainingTime);
  }
}
