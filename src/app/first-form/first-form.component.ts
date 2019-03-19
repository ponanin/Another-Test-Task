import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataFirstService } from '../data/data-first.service';
import { Observable, Subject } from 'rxjs';
import { IFirstData } from '../data/data.interface';
import { Statuses } from '../data/data.enum';
import { CellClickEvent, DataGridSortType, IDataGridColumn } from '../common/data-grid/data-grid.interface';
import { ISort } from './first-form.interface';
import { FilterService } from '../data/filter.service';
import { takeUntil } from 'rxjs/operators';
import { IFilterState } from '../common/filter/filter.interface';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.scss']
})
export class FirstFormComponent implements OnInit, OnDestroy {

  @ViewChild('status') statusTemplate;
  @ViewChild('relations') relationsTemplate;
  @ViewChild('remove') removeTemplate;

  statuses = Statuses;
  items$: Observable<Array<IFirstData>> = this.dataService.fetchData();
  columns: Array<IDataGridColumn> = [];

  query: string;
  filter: Array<IFilterState>;
  sort: ISort;
  destroyed$ = new Subject();

  constructor(private dataService: DataFirstService, filterEvents: FilterService) {
    filterEvents.flow
      .pipe(takeUntil(this.destroyed$))
      .subscribe(state => {
          this.filter = state;
          this.items$ = this.dataService.fetchData(this.query, this.filter, this.sort);
      }
      );
  }

  ngOnInit() {
    this.columns = [
      {
        title: 'Имя',
        name: 'name',
        sort: DataGridSortType.ASC
      },
      { title: 'Описание', name: 'description' },
      { title: 'Связи', name: 'relateItems', template: this.relationsTemplate, sort: false },
      { title: 'Статус', name: 'status', template: this.statusTemplate, sort: false },
      { name: 'remove', template: this.removeTemplate, sort: false }
    ];
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  cellClick({ row, column }: CellClickEvent) {
    // TODO: нормальный confirm
    if (column.name === 'remove' && confirm('Вы точно хотите удалить элемент?')) {
      this.dataService.removeElementById(row.id);
    }
  }

  search(query: string): void {
    this.query = query;
    this.items$ = this.dataService.fetchData(this.query, this.filter, this.sort);
  }

  onSort(columns: Array<IDataGridColumn>) {
    const sortColumn = columns.find(column => !!column.sort);

    if (sortColumn) {
      this.sort = {
        columnName: sortColumn.name,
        type: sortColumn.sort as any
      };

      this.items$ = this.dataService.fetchData(this.query, this.filter, this.sort);
    }
  }

}
