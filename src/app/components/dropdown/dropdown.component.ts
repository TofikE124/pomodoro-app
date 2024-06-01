import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  DropdownOptionComponent,
  DropdownOption,
} from './dropdown-option/dropdown-option.component';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [CommonModule, DropdownOptionComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor, AfterViewInit {
  @ContentChildren(DropdownOptionComponent)
  _dropdownOptions?: QueryList<DropdownOptionComponent>;

  @Input('placeholder') placeholder: string = '';
  @Input('isOpened') isOpened: boolean = false;
  @Input() value: string | number | null = null;
  @Input('small') small: boolean = false;

  @Input('options') options: DropdownOption[] = [];

  @Output('valueChange') valueChange: EventEmitter<string | number | null> =
    new EventEmitter();

  private onChange: (value: DropdownOptionComponent) => void = () => {};
  private onTouched: () => void = () => {};

  selectedOption?: DropdownOptionComponent;

  constructor(private elementRef: ElementRef) {}

  writeValue(value: string | number): void {
    this.value = value;
    this.populateOptionsValueChange();
  }

  registerOnChange(fn: (value: DropdownOptionComponent) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside && this.isOpened) {
      this.toggleDropdown();
    }
  }

  toggleDropdown() {
    this.isOpened = !this.isOpened;
  }

  ngAfterViewInit(): void {
    this.populateOptionsClickEvent();
  }

  populateOptionsClickEvent() {
    if (this._dropdownOptions) {
      this._dropdownOptions.forEach((option) => {
        option.optionClicked.subscribe((value) => {
          this.optionClicked(value);
        });
      });
    }
  }

  populateOptionsValueChange() {
    if (this._dropdownOptions) {
      this._dropdownOptions.forEach((option) => {
        if (option.value === this.value) this.selectOption(option);
      });
    }
  }

  optionClicked(option: DropdownOptionComponent) {
    this.selectOption(option);

    this.value = option.value;
    this.valueChange.emit(option.value);
    this.toggleDropdown();

    this.onChange(option);
  }

  selectOption(option: DropdownOptionComponent) {
    if (this.selectedOption) this.selectedOption.active = false;
    this.selectedOption = option;
    this.selectedOption.active = true;
  }
}
