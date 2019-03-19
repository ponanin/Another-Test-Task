import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  query: string;
  changed: Subject<string> = new Subject();

  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.changed.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(query => {
        this.query = query;
        this.onSearch.emit(this.query);
      });
  }

  onQueryChanged(query: string) {
    this.changed.next(query);
  }
}
