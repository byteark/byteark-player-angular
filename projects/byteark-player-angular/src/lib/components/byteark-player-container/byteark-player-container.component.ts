import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { PreviousValueService } from '../../services/previous-value-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import type {
  ByteArkPlayer,
  ByteArkPlayerContainerProps,
  ByteArkPlayerContainerState,
  ByteArkPlayerError,
  CreatePlayerFunction,
  SetupPlayerFunction,
} from '../../../types';
import {
  createPlayerInstance,
  loadPlayerResources,
  setupPlayer,
  setupPlayerOptions,
} from '../../../utils/player';
import {
  defaultCreatePlayerFunction,
  defaultSetupPlayerFunction,
} from '../../../utils/function';
import {
  PLAYER_CSS_FILENAME,
  PLAYER_ENDPOINT,
  PLAYER_JS_FILENAME,
  PLAYER_SERVER_ENDPOINT,
  PLAYER_VERSION,
} from '../../../constants';
import {
  ByteArkPlayerContainerError,
  LoadPlayerResourceError,
  SetupPlayerOptionsError,
} from '../../../utils/error';
import { PlayerPlaceholderComponent } from '../player-placeholder/player-placeholder.component';
import { updatePlayerProps } from '../../../utils/update-player-props';

@Component({
  selector: 'byteark-player-container',
  standalone: true,
  imports: [CommonModule, PlayerPlaceholderComponent],
  templateUrl: './byteark-player-container.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class ByteArkPlayerContainer implements OnInit, OnDestroy {
  @ViewChild('mediaRef') mediaRef: ElementRef<HTMLMediaElement | null> =
    new ElementRef<HTMLMediaElement | null>(null);

  @Input() options!: ByteArkPlayerContainerProps;
  @Input() lazyLoad: boolean = false;
  @Input() playerEndpoint: string = PLAYER_ENDPOINT;
  @Input() playerServerEndpoint: string = PLAYER_SERVER_ENDPOINT;
  @Input() playerVersion: string = PLAYER_VERSION;
  @Input() playerJsFileName: string = PLAYER_JS_FILENAME;
  @Input() playerCssFileName: string = PLAYER_CSS_FILENAME;
  @Input() createPlayerFunction: CreatePlayerFunction =
    defaultCreatePlayerFunction;
  @Input() setupPlayerFunction: SetupPlayerFunction =
    defaultSetupPlayerFunction;

  player: ByteArkPlayer | null = null;
  initializeInProgress: boolean = false;
  playerContainerState: ByteArkPlayerContainerState = {
    loaded: false,
    ready: false,
    error: null,
    showPlaceholder: true,
  };
  videoClasses: string[] = [];
  isBrowser: boolean;
  previousProps?: ByteArkPlayerContainerProps;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private previousValueService: PreviousValueService<ByteArkPlayerContainerProps>
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  usePrevious(value: ByteArkPlayerContainerProps) {
    this.previousValueService.setValue(value);
    this.previousProps = this.previousValueService.getPreviousValue();
  }

  onPlayerLoaded() {
    this.options.onPlayerLoaded?.();
  }

  onPlayerLoadError(
    error: ByteArkPlayerContainerError,
    originalError: ByteArkPlayerError | unknown
  ) {
    this.playerContainerState = { ...this.playerContainerState, error };
    this.options.onPlayerLoadError?.(error, originalError);
  }

  onPlayerSetup() {
    this.playerContainerState = { ...this.playerContainerState, loaded: true };
    this.options.onPlayerSetup?.();
  }

  onPlayerSetupError(
    error: ByteArkPlayerContainerError,
    originalError: ByteArkPlayerError | unknown
  ) {
    this.playerContainerState = { ...this.playerContainerState, error };
    this.options.onPlayerSetupError?.(error, originalError);
  }

  onPlayerCreated() {
    if (this.player) this.options.onPlayerCreated?.(this.player);
  }

  onPlayerReady() {
    this.playerContainerState = { ...this.playerContainerState, ready: true };
    if (this.player) this.options.onReady?.(this.player);
  }

  async onClickPlaceholder() {
    if (this.lazyLoad) {
      await this.initializePlayer();
    }
    await this.player?.play();
    this.playerContainerState = {
      ...this.playerContainerState,
      showPlaceholder: false,
    };
  }

  updateVideoClasses() {
    const videoClasses = [];
    if (this.options.className) videoClasses.push(this.options.className);
    if (this.options.fluid) {
      if (this.options.aspectRatio === '4:3') videoClasses.push('vjs-4-3');
      else if (this.options.aspectRatio === '16:9')
        videoClasses.push('vjs-16-9');
    }
    this.videoClasses = [...this.videoClasses, ...videoClasses];
  }

  async initializePlayer() {
    if (!this.isBrowser || this.initializeInProgress) return;

    this.initializeInProgress = true;
    try {
      await loadPlayerResources({
        playerJsFileName: this.playerJsFileName,
        playerCssFileName: this.playerCssFileName,
        playerVersion: this.playerVersion,
        playerEndpoint: this.playerEndpoint,
        playerServerEndpoint: this.playerServerEndpoint,
        playerSlugId: this.options.playerSlugId,
      });

      this.onPlayerLoaded();
      const options = await setupPlayerOptions(this.options);
      await setupPlayer(options, this.setupPlayerFunction);
      this.onPlayerSetup();

      this.player = await createPlayerInstance(
        this.mediaRef.nativeElement,
        options,
        this.createPlayerFunction,
        this.onPlayerReady
      );

      this.onPlayerCreated();

      this.player?.on('play', () => {
        this.playerContainerState = {
          ...this.playerContainerState,
          showPlaceholder: false,
        };
      });
    } catch (error) {
      if (error instanceof LoadPlayerResourceError) {
        this.onPlayerSetupError(error, error.originalError);
      } else if (error instanceof SetupPlayerOptionsError) {
        this.onPlayerLoadError(error, error.originalError);
      } else if (error instanceof ByteArkPlayerContainerError) {
        this.playerContainerState = { ...this.playerContainerState, error };
      }
      console.error(error);
    } finally {
      this.initializeInProgress = false;
    }
  }

  async ngOnInit() {
    if (this.isBrowser && !this.lazyLoad) await this.initializePlayer();
    this.updateVideoClasses();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.usePrevious(this.options);
      if (this.player && this.options && this.previousProps) {
        updatePlayerProps(this.player, this.options, this.previousProps);
      }
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player?.dispose();
      this.player = null;
      this.playerContainerState = {
        ...this.playerContainerState,
        ready: false,
      };
    }
  }
}
