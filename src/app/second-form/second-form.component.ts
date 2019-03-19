import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ISecondData } from '../data/data.interface';
import { IDataGridColumn, IDataGridConfig } from '../common/data-grid/data-grid.interface';
import { DataSecondService } from '../data/data-second.service';
import { IFilterState } from '../common/filter/filter.interface';
import { FilterService } from '../data/filter.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-second-form',
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.scss']
})
export class SecondFormComponent implements OnInit, OnDestroy {

  @ViewChild('data') dataTemplate;

  dataGridConfig: IDataGridConfig = {
    isHeaderVisible: false
  };

  items$: Observable<Array<ISecondData>> = this.dataService.getData();
  columns: Array<IDataGridColumn> = [];

  query: string;
  filter: Array<IFilterState>;
  destroyed$ = new Subject();

  constructor(private dataService: DataSecondService, filterEvents: FilterService) {
    filterEvents.flow
      .pipe(takeUntil(this.destroyed$))
      .subscribe(state => {
        this.filter = state;
        this.items$ = this.dataService.fetchData(this.query, this.filter);
      });
  }

  ngOnInit() {
    this.columns = [
      {
        name: 'main',
        sort: false,
        template: this.dataTemplate
      }
    ];
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  search(query: string): void {
    this.query = query;
    this.items$ = this.dataService.fetchData(this.query, this.filter);
  }

  onRowChange(id: number, data: ISecondData) {
    this.dataService.updateRow(id, data);
  }

  onRowRemove(id: number) {
    if (confirm('Вы точно хотите удалить элемент?')) {
      this.dataService.removeElementById(id);
    }
  }
}
