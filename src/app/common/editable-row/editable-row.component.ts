import { Component, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-editable-row',
  templateUrl: './editable-row.component.html',
  styleUrls: ['./editable-row.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditableRowComponent),
    multi: true
  }]
})
export class EditableRowComponent implements ControlValueAccessor {

  @ViewChild('input') inputElement;
  @Input('value') hiddenValue: string;

  get value() {
    return this.hiddenValue;
  }

  set value(val) {
    this.hiddenValue = val;
    this.propagateChange(val);
  }

  isEdit = false;
  propagateChange = (_: any) => {
  };

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (this.inputElement) {
      const clickedInside = this.inputElement.nativeElement.contains(targetElement);
      if (!clickedInside && this.isEdit) {
        this.onChange();
      }
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  toggleEdit(event) {
    event.stopPropagation();
    this.isEdit = !this.isEdit;
  }

  onChange() {
    this.isEdit = false;
    this.propagateChange(this.hiddenValue);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.hiddenValue = value;
      this.propagateChange(this.hiddenValue);
    }
  }

}
