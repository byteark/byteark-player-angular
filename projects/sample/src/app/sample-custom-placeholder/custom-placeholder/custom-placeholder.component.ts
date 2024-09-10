import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ByteArkPlayerContainerProps } from 'byteark-player-angular';

@Component({
  selector: 'custom-placeholder',
  standalone: true,
  templateUrl: './custom-placeholder.component.html',
})
export class CustomPlaceholderComponent {
  @Output() clickPlaceholder = new EventEmitter();
  @Input() playerProps!: ByteArkPlayerContainerProps;

  handleClickPlaceholder() {
    this.clickPlaceholder.emit();
  }
}
