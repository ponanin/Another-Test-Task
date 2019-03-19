import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ISecondData } from '../../data/data.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusWorker } from '../../data/data.enum';

@Component({
  selector: 'app-second-form-data',
  templateUrl: './second-form-data.component.html',
  styleUrls: ['./second-form-data.component.scss']
})
export class SecondFormDataComponent implements OnInit, OnDestroy {
  @Input() data: ISecondData;
  @Output() dataChange: EventEmitter<ISecondData> = new EventEmitter();
  @Output() onRemove: EventEmitter<void> = new EventEmitter();

  form: FormGroup;
  destroyed$ = new Subject();

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name),
      surname: new FormControl(this.data.surname),
      description: new FormControl(this.data.description),
      card: new FormGroup({
        phone: new FormControl(this.data.card.phone),
        email: new FormControl(this.data.card.email),
      })
    });
    this.form.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.dataChange.emit(this.form.value);
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  remove() {
    this.onRemove.emit();
  }

  get status() {
    return this.data.status.map(
      status => StatusWorker[status]
    ).join(', ');
  }
}
