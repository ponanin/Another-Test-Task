import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CellClickEvent, DataGridSortType, IDataGridColumn, IDataGridConfig } from './data-grid.interface';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {

  @Input() config: IDataGridConfig = {
    isHeaderVisible: true
  };
  @Input() columns: Array<IDataGridColumn>;
  @Input() rows: Array<any>;
  @Output() onSearch = new EventEmitter();
  @Output() onSort = new EventEmitter();
  @Output() onCellClick: EventEmitter<CellClickEvent> = new EventEmitter();

  DataGridSortType = DataGridSortType;

  constructor(private sanitizer: DomSanitizer) {
  }

  getRowData(row: any, property: any): SafeHtml {
    let result = '';
    if (row.hasOwnProperty(property)) {
      result = row[property];
    }
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

  onHeaderColumnClick(column: IDataGridColumn) {
    if (column && column.sort !== false) {
      switch (column.sort) {
        case DataGridSortType.ASC:
          column.sort = DataGridSortType.DESC;
          break;
        case DataGridSortType.DESC:
        default:
          column.sort = DataGridSortType.ASC;
          break;
      }

      this.columns.forEach(col => {
        if (column.name !== col.name && col.sort !== false) {
          delete col.sort;
        }
      });

      this.onSort.emit(this.columns);
    }
  }

  cellClick(row: any, column: IDataGridColumn) {
    this.onCellClick.emit({ row, column });
  }
}
