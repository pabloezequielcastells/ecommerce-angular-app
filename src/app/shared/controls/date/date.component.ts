import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

type Value = number;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
  ],
})
export class DateComponent implements OnInit, ControlValueAccessor {

  value?: Value;
  isDisabled: boolean = false;

  @Input() placeholder: string = '';
  @Input() min!: Date;
  @Input() max!: Date;
  @Output() change = new EventEmitter<Value>();
  @Output() closed = new EventEmitter<void>();


  get inputValue(): Date {
    return this.value ? new Date(this.value) : new Date();
  }

  constructor() { }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(value: Value): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(event: MatDatepickerInputEvent<Date>): void {
    const value = event.value ? event.value.getTime() : new Date().getTime();
    this.value = value;
    this.propagateChange(value);
    this.change.emit(value);
  }

  onClose(): void {
    this.propagateTouched();
    this.closed.emit();
  }

  ngOnInit(): void {
  }

}
