import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => YesNoButtonGroupComponent)
    }
  ]
})

export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {

  @Input() public value: string = null;
  @Input() public label = '';
  @Output() public valueChange = new EventEmitter<string>();
  public id: string = null
  public options = YesNoButtonGroupOptions;
  public onChange = (value: string) => {};
  public onTouched = () => {};

  constructor() { }

  ngOnInit(): void {
    this.id = `yes-no-button-group-${uuid.v1()}`
  }

  public writeValue(value: string): void {
    //Atualização do model para view
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  public registerOnChange(fn: (value:string)=> void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn:  () => void): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  public active(value: string): void {
    // this.value = value;
    // this.valueChange.emit(this.value);

    this.writeValue(value);
  }
}
enum YesNoButtonGroupOptions {
  YES = 'yes',
  NO = 'no'
}
