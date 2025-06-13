import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() options: string[] = [];
  @Input() multiple: boolean = false;
  @Input() selected: string | string[] = '';

  @Output() selectedChange = new EventEmitter<string | string[]>();

  toggleOption(option: string) {
    if (this.multiple) {
      const arr = this.selected as string[];
      const updated = arr.includes(option)
        ? arr.filter(o => o !== option)
        : [...arr, option];
      this.selected = updated;
      this.selectedChange.emit(this.selected);
    } else {
      this.selected = option;
      this.selectedChange.emit(this.selected);
    }
  }

  isChecked(option: string): boolean {
    return this.multiple
      ? (this.selected as string[]).includes(option)
      : this.selected === option;
  }

  get formGroupClass(): string {
    return this.multiple ? 'form-group multiple' : 'form-group';
  }
}
