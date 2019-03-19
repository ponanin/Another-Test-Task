import { NgModule } from '@angular/core';
import { DataGridComponent } from './data-grid/data-grid.component';
import { FilterComponent } from './filter/filter.component';
import { EditableRowComponent } from './editable-row/editable-row.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CommonModule as CommonAngularModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DataGridComponent, FilterComponent, EditableRowComponent, SearchBarComponent],
  imports: [
    CommonAngularModule, FormsModule
  ],
  exports: [DataGridComponent, FilterComponent, EditableRowComponent, SearchBarComponent]
})
export class CommonModule {
}
