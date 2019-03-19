import { DataGridSortType } from '../common/data-grid/data-grid.interface';

export interface ISort {
  columnName: string;
  type: DataGridSortType;
}
