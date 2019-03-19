import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { DataFirstService } from './data/data-first.service';
import { DataSecondService } from './data/data-second.service';
import { IFilterParams, IFilterState } from './common/filter/filter.interface';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { FilterType, Statuses, StatusWorker } from './data/data.enum';
import { FilterService } from './data/filter.service';

// TODO: вынести всю логику построения в nested компонент
// TODO: симулировать загрузку с back-end и добавить loading-крутилки
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  filterParams: Array<IFilterParams> = [];

  constructor(
    private router: Router,
    private dataFirst: DataFirstService,
    private dataSecond: DataSecondService,
    private filter: FilterService
  ) {
    router.events.subscribe((navigationEvent: Event) => {
      if (navigationEvent instanceof NavigationEnd) {
        this.buildFilterParams(navigationEvent.url);
      }
    });
  }

  buildFilterParams(route: string) {
    // TODO: обновлять фильтр при обновлении данных
    switch (route) {
      case '/form1':
        forkJoin(
          this.dataFirst.getAvailableRelations(),
          this.dataFirst.getAvailableStatuses()
        ).pipe(take(1)).subscribe(([relations, statuses]) => {
          this.filterParams = [
            {
              title: 'Связи',
              type: FilterType.Relations,
              data: relations.map(relation => ({ searchValue: relation.id, title: relation.name }))
            },
            {
              title: 'Статусы',
              type: FilterType.Status,
              data: statuses.map(status => ({ searchValue: status, title: Statuses[status] }))
            }
          ];
        });
        break;
      case '/form2':
        this.dataSecond.getAvailableStatuses()
          .pipe(take(1)).subscribe(statuses => {
          this.filterParams = [
            {
              title: 'Статусы',
              type: FilterType.StatusWorker,
              data: statuses.map(status => ({ searchValue: status, title: StatusWorker[status] }))
            }
          ];
        });
        break;
    }
  }

  onFilter(state: Array<IFilterState>) {
    this.filter.push(state);
  }
}
