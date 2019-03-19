import { Injectable } from '@angular/core';
import { ISecondData } from './data.interface';
import { Observable, of } from 'rxjs';
import { secondDataSource } from './data.const';
import { distinct, map, switchMap, toArray } from 'rxjs/operators';
import { FilterType, StatusWorker } from './data.enum';
import { IFilterState } from '../common/filter/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class DataSecondService {

  getData(): Observable<Array<ISecondData>> {
    return of(secondDataSource);
  }

  getAvailableStatuses(): Observable<Array<StatusWorker>> {
    return this.getData()
      .pipe(
        switchMap(r => r),
        switchMap(data => data.status),
        distinct(),
        toArray()
      );
  }

  fetchData(query?: string, filter?: Array<IFilterState>): Observable<Array<ISecondData>> {
    let result = this.getData();
    if (query) {
      query = query.toLocaleLowerCase();
      result = result.pipe(
        map(data => {
          const getDeepValues = (obj) => {
            return Object.values(obj)
              .map(value => {
                if (typeof value !== 'object') {
                  return value.toString().toLocaleLowerCase();
                } else {
                  return getDeepValues(value);
                }
              });
          };
          return data.filter(element => getDeepValues(element).toString().includes(query));
        }));
    }

    if (filter) {
      filter.forEach(filterType => {
        if (filterType.data.length) {
          result = result.pipe(
            map(data => {
              switch (filterType.type) {
                case FilterType.StatusWorker:
                  data = data.filter(item => filterType.data.some(status => item.status.includes(status)));
                  break;
              }
              return data;
            })
          );
        }
      });
    }
    return result;
  }

  updateRow(id: number, row: ISecondData) {
    const index = secondDataSource.findIndex(data => data.id === id);
    if (index >= 0) {
      secondDataSource[index] = { ...secondDataSource[index], ...row };
    }
  }

  removeElementById(id: number) {
    const index = secondDataSource.findIndex(data => data.id === id);
    if (index >= 0) {
      secondDataSource.splice(index, 1);
    }
  }
}
