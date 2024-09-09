import { Component, Input } from '@angular/core';
import { type ByteArkPlayerContainerError } from '../../../utils/error';

@Component({
  selector: 'player-load-error-message',
  standalone: true,
  imports: [],
  templateUrl: './player-load-error-message.component.html',
})
export class PlayerLoadErrorMessageComponent {
  @Input() error: ByteArkPlayerContainerError = {
    message: 'An unknown error occurred',
    messageSecondary: 'Please refresh the page to try again.',
    code: 'ERROR_BYTEARK_PLAYER_REACT_100000',
    originalError: undefined,
    name: '',
  };
}
