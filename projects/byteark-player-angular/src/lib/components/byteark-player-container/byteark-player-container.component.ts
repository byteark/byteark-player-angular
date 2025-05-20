import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  OnChanges,
} from '@angular/core';

import {
  PLAYER_CSS_FILENAME,
  PLAYER_ENDPOINT,
  PLAYER_JS_FILENAME,
  PLAYER_SERVER_ENDPOINT,
  PLAYER_VERSION,
} from '../../../constants';
import { ByteArkPlayerContainerError, LoadPlayerResourceError, SetupPlayerOptionsError } from '../../../utils/error';
import { defaultCreatePlayerFunction, defaultSetupPlayerFunction } from '../../../utils/function';
import { createPlayerInstance, loadPlayerResources, setupPlayer, setupPlayerOptions } from '../../../utils/player';
import { updatePlayerProps } from '../../../utils/update-player-props';
import { PlayerPlaceholderComponent } from '../player-placeholder/player-placeholder.component';

import { PreviousValueService } from './byteark-player-container.component.service';

import type {
  ByteArkPlayer,
  ByteArkPlayerContainerProps,
  ByteArkPlayerContainerState,
  ByteArkPlayerError,
  CreatePlayerFunction,
  SetupPlayerFunction,
} from '../../../types';

@Component({
  selector: 'byteark-player-container',
  standalone: true,
  imports: [CommonModule, PlayerPlaceholderComponent],
  templateUrl: './byteark-player-container.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ByteArkPlayerContainer implements OnInit, OnDestroy, OnChanges {
  @ViewChild('mediaRef') mediaRef: ElementRef<HTMLMediaElement | null> = new ElementRef<HTMLMediaElement | null>(null);

  @Input() options!: ByteArkPlayerContainerProps;
  @Input() playerEndpoint: string = PLAYER_ENDPOINT;
  @Input() playerServerEndpoint: string = PLAYER_SERVER_ENDPOINT;
  @Input() playerVersion: string = PLAYER_VERSION;
  @Input() playerJsFileName: string = PLAYER_JS_FILENAME;
  @Input() playerCssFileName: string = PLAYER_CSS_FILENAME;
  @Input() createPlayerFunction: CreatePlayerFunction = defaultCreatePlayerFunction;
  @Input() setupPlayerFunction: SetupPlayerFunction = defaultSetupPlayerFunction;

  player: ByteArkPlayer | null = null;

  initializeInProgress = false;

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
    @Inject(PLATFORM_ID) private platformId: object,
    private previousValueService: PreviousValueService<ByteArkPlayerContainerProps>,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.usePrevious = this.usePrevious.bind(this);
    this.onPlayerLoaded = this.onPlayerLoaded.bind(this);
    this.onPlayerLoadError = this.onPlayerLoadError.bind(this);
    this.onPlayerSetup = this.onPlayerSetup.bind(this);
    this.onPlayerSetupError = this.onPlayerSetupError.bind(this);
    this.onPlayerCreated = this.onPlayerCreated.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onClickPlaceholder = this.onClickPlaceholder.bind(this);
    this.updateVideoClasses = this.updateVideoClasses.bind(this);
    this.initializePlayer = this.initializePlayer.bind(this);
  }

  usePrevious(value: ByteArkPlayerContainerProps) {
    this.previousValueService.setValue(value);

    this.previousProps = this.previousValueService.getPreviousValue();
  }

  onPlayerLoaded() {
    if (this.options.onPlayerLoaded) {
      this.options.onPlayerLoaded();
    }
  }

  onPlayerLoadError(error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError | unknown) {
    this.playerContainerState = {
      ...this.playerContainerState,
      error,
    };

    if (this.options.onPlayerLoadError) {
      this.options.onPlayerLoadError(error, originalError);
    }
  }

  onPlayerSetup() {
    this.playerContainerState = {
      ...this.playerContainerState,
      loaded: true,
    };

    if (this.options.onPlayerSetup) {
      this.options.onPlayerSetup();
    }
  }

  onPlayerSetupError(error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError | unknown) {
    this.playerContainerState = {
      ...this.playerContainerState,
      error,
    };

    if (this.options.onPlayerSetupError) {
      this.options.onPlayerSetupError(error, originalError);
    }
  }

  onPlayerCreated() {
    this.playerContainerState = {
      ...this.playerContainerState,
      showPlaceholder: false,
    };

    if (this.player && this.options.onPlayerCreated) {
      this.options.onPlayerCreated(this.player);
    }
  }

  onPlayerReady() {
    this.playerContainerState = {
      ...this.playerContainerState,
      ready: true,
    };

    if (this.player && this.options.onReady) {
      this.options.onReady(this.player);
    }

    if (this.options.lazyload) {
      requestAnimationFrame(async () => {
        // Wait for the next animation frame to ensure the player is ready

        await this.player?.play();
      });
    }
  }

  async onClickPlaceholder() {
    if (this.options.lazyload) {
      await this.initializePlayer();
    }

    this.playerContainerState = {
      ...this.playerContainerState,
      showPlaceholder: false,
    };
  }

  updateVideoClasses() {
    const videoClasses = [];

    if (this.options.class) {
      videoClasses.push(this.options.class);
    }

    if (this.options.fluid) {
      if (this.options.aspectRatio === '4:3') {
        videoClasses.push('vjs-4-3');
      } else if (this.options.aspectRatio === '16:9') {
        videoClasses.push('vjs-16-9');
      }
    }

    this.videoClasses = [...this.videoClasses, ...videoClasses];
  }

  async initializePlayer() {
    if (!this.isBrowser || this.initializeInProgress) {
      return;
    }

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
        this.onPlayerReady,
      );

      this.onPlayerCreated();
    } catch (error) {
      if (error instanceof LoadPlayerResourceError) {
        this.onPlayerSetupError(error, error.originalError);
      } else if (error instanceof SetupPlayerOptionsError) {
        this.onPlayerLoadError(error, error.originalError);
      } else if (error instanceof ByteArkPlayerContainerError) {
        this.playerContainerState = {
          ...this.playerContainerState,
          error,
        };
      }

      console.error(error);
    } finally {
      this.initializeInProgress = false;
    }
  }

  async ngOnInit() {
    if (this.isBrowser && !this.options.lazyload) {
      await this.initializePlayer();
    }

    this.updateVideoClasses();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.previousProps = changes['options'].previousValue;

      if (this.player && this.options && this.previousProps) {
        updatePlayerProps(this.player, this.options, this.previousProps);
      }
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player?.dispose();

      this.player = null;
    }

    // reset state to initial
    this.playerContainerState = {
      ...this.playerContainerState,
      loaded: false,
      ready: false,
      error: null,
      showPlaceholder: true,
    };
  }
}
