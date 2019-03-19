import { TemplateRef } from '@angular/core';

export enum DataGridSortType {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface IDataGridColumn {
  name: string;
  title?: string;
  sort?: DataGridSortType | boolean;
  template?: TemplateRef<any>;
}

export interface CellClickEvent {
  row: any;
  column: IDataGridColumn;
}

export interface IDataGridConfig {
  isHeaderVisible: boolean;
}
