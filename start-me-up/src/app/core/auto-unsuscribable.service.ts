import { Injectable, OnDestroy } from '@angular/core';
// Utils
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AutoUnsuscribableService implements OnDestroy {
  private destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  takeUntilDestroyed<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.destroy$);
  }
}
