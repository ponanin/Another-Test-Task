import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IFilterParam, IFilterParams, IFilterState } from './filter.interface';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges {

  @Input() filterParams: Array<IFilterParams> = [];
  @Output() filter = new EventEmitter();

  filterState: Array<IFilterState> = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterParams) {
      this.filterState = this.filterParams.map(param => ({ title: param.title, type: param.type, data: [] }));
    }
  }

  onFilterChange(event, index: number, data: IFilterParam) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.filterState[index].data.push(data.searchValue);
    } else {
      const findIndex = this.filterState[index].data.findIndex(state => state === data.searchValue);
      if (findIndex >= -1) {
        this.filterState[index].data.splice(findIndex, 1);
      }
    }
    this.filter.emit(this.filterState);
  }
}
