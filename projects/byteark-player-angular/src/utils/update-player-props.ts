import isEqual from 'lodash.isequal';
import type { ByteArkPlayer, ByteArkPlayerContainerProps } from '../types';

type PlayerPropName =
  | 'autoplay'
  | 'aspectRatio'
  | 'breakpoints'
  | 'controls'
  | 'fill'
  | 'fluid'
  | 'loop'
  | 'language'
  | 'muted'
  | 'playbackRates'
  | 'playsinline'
  | 'poster'
  | 'preload'
  | 'responsive'
  | 'sources';

interface PlayerProps {
  name: PlayerPropName;
  setter?: 'src';
}

const playerProps: PlayerProps[] = [
  {
    name: 'autoplay',
  },
  {
    name: 'aspectRatio',
  },
  {
    name: 'breakpoints',
  },
  {
    name: 'controls',
  },
  {
    name: 'fill',
  },
  {
    name: 'fluid',
  },
  {
    name: 'loop',
  },
  {
    name: 'language',
  },
  {
    name: 'muted',
  },
  {
    name: 'playbackRates',
  },
  {
    name: 'playsinline',
  },
  {
    name: 'poster',
  },
  {
    name: 'preload',
  },
  {
    name: 'responsive',
  },
  {
    name: 'sources',
    setter: 'src',
  },
];

export function updatePlayerProps(
  player: ByteArkPlayer,
  nextProps: ByteArkPlayerContainerProps,
  prevProps?: ByteArkPlayerContainerProps
) {
  if (player.isDisposed()) {
    return;
  }

  playerProps.forEach(({ name, setter }) => {
    const effectiveSetter: PlayerPropName = (setter || name) as PlayerPropName;

    // @ts-ignore
    const selectedPlayerProperty = player[effectiveSetter];

    if (typeof selectedPlayerProperty === 'function') {
      if (prevProps) {
        if (!isEqual(nextProps[name], prevProps[name])) {
          selectedPlayerProperty.call(player, nextProps[name]);
        }
      } else {
        selectedPlayerProperty.call(player, nextProps[name]);
      }
    }
  });
}
