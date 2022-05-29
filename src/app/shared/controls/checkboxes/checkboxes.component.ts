import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ControlItem, Value } from '@app/models/frontend';
export { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true
    }
  ]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {

  value!: Value[];
  isDisabled!: boolean;

  @Input() items!: ControlItem[];
  @Output() changed = new EventEmitter<Value[]>();

  constructor() { }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(obj: Value[]): void {
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

  isChecked(value: Value): boolean {
    return this.value?.includes(value) ?? false;
  }

  onChanged(value: Value, checked: Event): void {
    const { target }  = checked;
    const resultado = (target as HTMLInputElement).checked;
    const selected = this.updateValues(value, resultado);
    this.propagateChange(selected);
    this.changed.emit(selected);
  }

  private updateValues(value: Value, checked: boolean): Value[] {

    const selected : Value[] = this.value ??   [];
    if (checked) {
      if ( !selected.includes(value) )
      {
        selected.push(value);
        console.log([ value, checked] );
      } else {
        const index = selected.findIndex(s => s === value);
        selected.splice(index, 1);
      }
    }
    return selected.length ? selected: [];
  }

  ngOnInit(): void {
  }

}
