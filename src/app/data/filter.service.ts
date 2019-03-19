import { Injectable } from '@angular/core';
import { IFilterState } from '../common/filter/filter.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterEvents: Subject<Array<IFilterState>> = new Subject();

  push(state: Array<IFilterState>) {
    this.filterEvents.next(state);
  }

  get flow() {
    return this.filterEvents;
  }
}
