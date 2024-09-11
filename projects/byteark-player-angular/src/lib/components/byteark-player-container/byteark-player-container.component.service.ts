import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreviousValueService<T> {
  private currentValue = new BehaviorSubject<T | undefined>(undefined);
  private previousValue: T | undefined;

  setValue(value: T): void {
    this.previousValue = this.currentValue.value;
    this.currentValue.next(value);
  }

  getPreviousValue(): T | undefined {
    return this.previousValue;
  }
}
