import { Injectable } from '@angular/core';
import { IFirstData, IRelation } from './data.interface';
import { Observable, of } from 'rxjs';
import { firstDataSource } from './data.const';
import { distinct, map, switchMap, toArray } from 'rxjs/operators';
import { FilterType, Statuses } from './data.enum';
import { ISort } from '../first-form/first-form.interface';
import { DataGridSortType } from '../common/data-grid/data-grid.interface';
import { IFilterState } from '../common/filter/filter.interface';

// TODO: можно подумать вынести общую логику или в абстрактный класс, хотя врядли такое будет в продакшене
@Injectable({
  providedIn: 'root'
})
export class DataFirstService {

  constructor() {
  }

  getData(): Observable<Array<IFirstData>> {
    return of(firstDataSource);
  }

  getAvailableRelations(): Observable<Array<IRelation>> {
    return this.getData()
      .pipe(
        switchMap(r => r),
        switchMap(data => data.relateItems),
        distinct(r => r.id),
        toArray()
      );
  }

  getAvailableStatuses(): Observable<Array<Statuses>> {
    return this.getData()
      .pipe(
        switchMap(r => r),
        switchMap(data => of(data.status)),
        distinct(),
        toArray()
      );
  }

  fetchData(query?: string, filter?: Array<IFilterState>, sort?: ISort): Observable<Array<IFirstData>> {
    let result = this.getData();
    if (query) {
      // TODO: подсвечивать найденные элементы
      query = query.toLocaleLowerCase();
      result = result.pipe(
        map(data => {
          return data.filter(element => {
            // TODO: вынести в отдельную функцию
            return element.name.toLocaleLowerCase().includes(query) ||
              element.description.toLocaleLowerCase().includes(query) ||
              element.relateItems.some(relation => relation.name.toLocaleLowerCase().includes(query));
          });
        })
      );
    }
    if (filter) {
      filter.forEach(filterType => {
        if (filterType.data.length) {
          result = result.pipe(
            map(data => {
              switch (filterType.type) {
                case FilterType.Relations:
                  data = data.filter(item => filterType.data.some(
                    relationId => item.relateItems.findIndex(relation => relation.id === relationId) > -1
                  ));
                  break;
                case FilterType.Status:
                  data = data.filter(item => filterType.data.includes(item.status));
                  break;
              }
              return data;
            })
          );
        }
      });
    }

    if (sort) {
      result = result.pipe(
        map(firstData => {
          return firstData.sort((first: any, second: any) => {
            if (first[sort.columnName] > second[sort.columnName]) {
              return sort.type === DataGridSortType.DESC ? -1 : 1;
            } else if (first[sort.columnName] < second[sort.columnName]) {
              return sort.type === DataGridSortType.ASC ? -1 : 1;
            }
            return 0;
          });
        })
      );
    }
    return result;
  }

  removeElementById(id: number) {
    const index = firstDataSource.findIndex(data => data.id === id);
    if (index >= 0) {
      firstDataSource.splice(index, 1);
    }
  }
}
