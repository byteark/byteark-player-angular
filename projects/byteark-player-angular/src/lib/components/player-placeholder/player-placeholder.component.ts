import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PlayerLoadErrorMessageComponent } from '../player-load-error-message/player-load-error-message.component';
import {
  type ByteArkPlayerContainerState,
  type ByteArkPlayerContainerProps,
} from '../../../types';
import { CommonModule } from '@angular/common';

function getPlaceholderPaddingTopFromAspectRatio(aspectRatio: unknown): number {
  if (typeof aspectRatio === 'number') {
    return aspectRatio;
  }

  if (typeof aspectRatio !== 'string') {
    return 0;
  }

  const [width, height] = aspectRatio.split(':').map(Number.parseFloat);

  if (width === 0 || height === 0) {
    return 0;
  }

  return (height / width) * 100;
}

@Component({
  selector: 'player-placeholder',
  standalone: true,
  imports: [CommonModule, PlayerLoadErrorMessageComponent],
  templateUrl: './player-placeholder.component.html',
})
export class PlayerPlaceholderComponent implements OnInit {
  @Input() playerProps!: ByteArkPlayerContainerProps;
  @Input() state!: Pick<ByteArkPlayerContainerState, 'error' | 'loaded'>;
  @Input() template?: ElementRef<any>;
  @Output() onClickPlaceholder = new EventEmitter();

  placeholderCustomStyle: Record<string, string> = {
    position: 'relative',
    width: '100%',
    minWidth: '100%',
    background: '#000000',
    backgroundImage: 'none',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: 'default',
    paddingTop: '',
    height: '',
    minHeight: '',
  };
  playIconStyle: Record<string, string> = {
    position: 'absolute',
    width: '90px',
    top: '50%',
    left: '50%',
    marginTop: '-2.75em',
    marginLeft: '-2.75em',
    background: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '50%',
  };
  pathStyle: Record<string, string> = {
    fill: '#ffffff',
    transform: 'translateX(13px) translateY(9px) scale(0.7)',
  };

  ngOnInit(): void {
    console.log('playerProps', this.playerProps);
    this.template = this.playerProps.placeholderTemplate;

    const { fluid, aspectRatio, fill, lazyload, poster } = this.playerProps;
    const { error, loaded } = this.state;

    if (fluid) {
      this.placeholderCustomStyle[
        'paddingTop'
      ] = `${getPlaceholderPaddingTopFromAspectRatio(aspectRatio || '16:9')}%`;
    }
    if (!fluid && fill) {
      this.placeholderCustomStyle['height'] = '100%';
      this.placeholderCustomStyle['minHeight'] = '100%';
    }

    if (lazyload && !loaded) {
      this.placeholderCustomStyle['position'] = 'relative';
    }
    if (lazyload && loaded) {
      this.placeholderCustomStyle['position'] = 'absolute';
    }

    if (!error) {
      if (poster) {
        this.placeholderCustomStyle['backgroundImage'] = `url(${poster})`;
      }

      this.placeholderCustomStyle['cursor'] = 'pointer';
    }
  }

  shouldShowPlayIcon =
    this.playerProps?.controls === undefined ||
    this.playerProps?.controls === null ||
    this.playerProps?.controls === true;
}
