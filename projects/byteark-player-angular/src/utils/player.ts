import { isBrowserSupportDrm } from './drm';
import {
  CreatePlayerError,
  LoadPlayerResourceError,
  SetupPlayerError,
  SetupPlayerOptionsError,
} from './error';
import {
  ByteArkPlayer,
  ByteArkPlayerContainerProps,
  ByteArkPlayerOptions,
  CreatePlayerFunction,
  SetupPlayerFunction,
} from '../types';
import { loadScriptOrStyle } from './load-script-or-style';

type LoadPlayerResourceConfig = Pick<
  ByteArkPlayerContainerProps,
  | 'playerJsFileName'
  | 'playerCssFileName'
  | 'playerVersion'
  | 'playerEndpoint'
  | 'playerServerEndpoint'
  | 'playerSlugId'
>;

export async function loadPlayerResources(config: LoadPlayerResourceConfig) {
  try {
    const {
      playerJsFileName,
      playerCssFileName,
      playerVersion,
      playerEndpoint,
      playerServerEndpoint,
      playerSlugId,
    } = config;

    const promises: Promise<void>[] = [];

    if (playerSlugId) {
      if (playerJsFileName) {
        promises.push(
          loadScriptOrStyle(
            `byteark-player-script-${playerSlugId}`,
            `${playerServerEndpoint}/${playerSlugId}/libraries/${playerJsFileName}`,
            'script'
          )
        );
      }

      if (playerCssFileName) {
        promises.push(
          loadScriptOrStyle(
            `byteark-player-style-${playerSlugId}`,
            `${playerServerEndpoint}/${playerSlugId}/libraries/${playerCssFileName}`,
            'style'
          )
        );
      }
    } else {
      if (playerJsFileName) {
        promises.push(
          loadScriptOrStyle(
            `byteark-player-script-${playerVersion}`,
            `${playerEndpoint}/${playerVersion}/${playerJsFileName}`,
            'script'
          )
        );
      }

      if (playerCssFileName) {
        promises.push(
          loadScriptOrStyle(
            `byteark-player-style-${playerVersion}`,
            `${playerEndpoint}/${playerVersion}/${playerCssFileName}`,
            'style'
          )
        );
      }
    }

    await Promise.all(promises);
  } catch (error) {
    throw new LoadPlayerResourceError('Failed to load player resources', error);
  }
}

export async function setupPlayerOptions(options: ByteArkPlayerOptions) {
  try {
    const autoplayResult = await window.bytearkPlayer.canAutoplay(options);

    return {
      ...options,
      autoplayResult_: autoplayResult,
    };
  } catch (error) {
    throw new SetupPlayerOptionsError('Failed to setup player options', error);
  }
}

export async function setupPlayer(
  options: ByteArkPlayerOptions,
  setupPlayerFunction: SetupPlayerFunction
) {
  try {
    await setupPlayerFunction(options, loadScriptOrStyle);
  } catch (error) {
    throw new SetupPlayerError('Failed to setup player', error);
  }
}

export async function createPlayerInstance(
  mediaElement: HTMLMediaElement | null,
  options: ByteArkPlayerOptions,
  createPlayerFunction: CreatePlayerFunction,
  onReady: () => void
): Promise<ByteArkPlayer | null> {
  if (mediaElement === null) {
    return null;
  }

  window.bytearkPlayer = window.bytearkPlayer || {};
  window.bytearkPlayer.isBrowserSupportDrm = isBrowserSupportDrm;

  try {
    const player = createPlayerFunction(mediaElement!, options, onReady);
    return player;
  } catch (error) {
    throw new CreatePlayerError('Failed to create player instance', error);
  }
}
