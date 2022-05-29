import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ControlItem, Value } from '@app/models/frontend';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  value!: Value;
  isDisabled!: boolean;

  @Input() items!: ControlItem[];
  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<Value>();


  constructor() { }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(obj: Value): void {
    this.value = obj;
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

   onChange(event: MatSelectChange): void {
     const value = event.value;
     this.value = value;
     this.propagateChange(value);
     this.changed.emit(value);
   }

   onBlur(): void {
     this.propagateTouched();
   }

  ngOnInit(): void {
  }

}
