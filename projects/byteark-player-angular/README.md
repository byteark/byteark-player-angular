# ByteArk Player Container for Angular

[![NPM](https://img.shields.io/npm/v/@byteark/byteark-player-angular.svg)](https://www.npmjs.com/package/@byteark/byteark-player-angular)

- [ByteArk Player Container for Angular](#byteark-player-container-for-angular)
  - [Demo](#demo)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Basic Props](#basic-props)
    - [Source Object](#source-object)
  - [Callback Props](#callback-props)
  - [Advanced Props](#advanced-props)
  - [Advanced Usages](#advanced-usages)
    - [Controlling Players](#controlling-players)
    - [Using VideoJS Plugins](#using-videojs-plugins)
    - [Request Media/Encryption with credentials](#request-mediaencryption-with-credentials)
  - [License](#license)

## Demo

You can try on [the demo page](https://byteark-player-angular-demo.vercel.app/).

## Features

- Remote player updates. No need to update your code for minor improvements.
- Using placeholder to maintain page's layout before the player ready.
- Controls basic behaviours via props.
- Custom advance behaviours via callbacks to access ByteArk Player/VideoJS instance directly.
- Supported TypeScript

## Installation

This library is distributed via NPM. You may install from NPM or Yarn.

```bash
# For NPM
npm install --save @byteark/byteark-player-angular
# For Yarn
yarn add @byteark/byteark-player-angular
# For pnpm
pnpm add @byteark/byteark-player-angular
```

## Usage

To use the ByteArk Player Container in your Angular application, follow these steps:

1. **Import the ByteArkPlayerContainer component:**

   ```typescript
   import { Component } from "@angular/core";
   import { ByteArkPlayerContainer, type ByteArkPlayerContainerProps } from "@byteark/byteark-player-angular";

   @Component({
     selector: "app-sample-blog",
     standalone: true,
     imports: [ByteArkPlayerContainer],
     template: ` <byteark-player-container [options]="options"></byteark-player-container> `,
   })
   export class SampleBlogComponent {
     title = "ByteArk Player Container | Sample Blog";
   }
   ```

2. **Add the component to your template:**

   ```html
   <byteark-player-container [options]="options"></byteark-player-container>
   ```

3. **Configure the player options:**

   ```typescript
   export class SampleBlogComponent {
     title = "ByteArk Player Container | Sample Blog";
     options: ByteArkPlayerContainerProps = {
       fluid: true,
       autoplay: false,
       aspectRatio: "16:9",
       poster: "https://example.com/poster.jpg",
       sources: [
         {
           src: "https://example.com/video.mp4",
           type: "video/mp4",
           title: "Sample Video",
         },
       ],
     };
   }
   ```

## Basic Props

Following properties are the properties that can be updated to the player,
without re-creating the player instance. Additional properties will be passed to player.

| Name          | Type           | Default | Description                                                                   |
| ------------- | -------------- | ------- | ----------------------------------------------------------------------------- |
| autoplay      | Boolean/String | true    | Autoplay the video after player is created. (true/false/'muted'/'play'/'any') |
| aspectRatio   | String         | -       | Use with fluid layout mode, to inform expected video's aspect ratio (16:9)    |
| controls      | Boolean        | true    | Show/hide the controls bar.                                                   |
| fill          | Boolean        | -       | Use fill layout mode.                                                         |
| fluid         | Boolean        | -       | Use fluid layout mode.                                                        |
| loop          | Boolean        | -       | Restart the video playback after plays to the end.                            |
| muted         | Boolean        | -       | Play the video without sounds.                                                |
| playerSlugId  | String         | -       | SlugId of player created via api player server service                        |
| playerVersion | String         | 1.0     | Version of the player to use.                                                 |
| playbackRate  | Number         | 1.0     | Playback speed. 1.0 means original speed.                                     |
| playsinline   | Boolean        | true    | Should be true so custom controls available on all platforms, including iOS.  |
| poster        | String         | -       | Image to be show before the video is playing.                                 |
| preload       | String         | -       | Preload the video before play. ('none'/'metadata'/'auto')                     |
| responsive    | Boolean        | -       | Auto show/hide controls depending on the screen size.                         |
| seekButtons   | Boolean        | false   | Show 10 seconds seek buttons and allow double-tap to seek on mobile.          |
| sources       | Array          | -       | Array of video source object to be played.                                    |
| volume        | Number         | -       | Video's volume, between 0 to 1.                                               |

You can also use other props not listed here,
but appear as [VideoJS's options](https://docs.videojs.com/tutorial-options.html#playbackrates).
However, changing props will not effective after the player is created.

### Source Object

The `source` object has 2 required fields, and more optional field:

| Name    | Type   | Description                            |
| ------- | ------ | -------------------------------------- |
| src     | String | URL to the video.                      |
| type    | String | Video content type.                    |
| title   | String | Video title to display on the player.  |
| videoId | String | Video's ID, usually used on Analytics. |
| poster  | String | Poster image URL for the video.        |

To provide multiple version of sources, you can use array of source objects.

## Callback Props

We also provide some callback properties, so you can inject some behaviours
directly to the ByteArk Player, and also, to the VideoJS's instance.

| Name                 | Type     | Callback Parameters                                                        | Description                                                                 |
| -------------------- | -------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| onPlayerLoaded       | Function | -                                                                          | Callback function to be called when loaded player's resources.              |
| onPlayerLoadingError | Function | `({error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError)` | Callback function to be called when there're an error about loading player. |
| onPlayerSetup        | Function | -                                                                          | Callback function to be called when player is setup.                        |
| onPlayerSetupError   | Function | `({error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError)` | Callback function to be called when there're an error when setup player.    |
| onReady              | Function | `(player: ByteArkPlayer)`                                                  | Callback function to be called when a player instance is ready.             |
| onPlayerCreated      | Function | `(player: ByteArkPlayer)`                                                  | Callback function to be called when a player instance is created.           |

## Advanced Props

We also provide some ways to custom the appearance of the video placeholder,
and some advance behaviours.

| Name                 | Type        | Description                                                                                                                                                                    |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| placeholderTemplate  | TemplateRef | Custom video placeholder. This should be an Angular TemplateRef.                                                                                                               |
| createPlayerFunction | Function    | Custom video instance. This function should return a VideoJS's player instance.                                                                                                |
| lazyload             | Boolean     | The player loads its asset files once it got rendered on the webpage. By passing this prop, the player then loads its asset files once the user clicked on the player instead. |
| playerEndpoint       | String      | Endpoint to the video player (without version part).                                                                                                                           |
| playerJsFileName     | String      | File name of player's JS.                                                                                                                                                      |
| playerCssFileName    | String      | File name of player's CSS.                                                                                                                                                     |

```typescript
import { Component } from "@angular/core";
import { ByteArkPlayerContainer, type ByteArkPlayerContainerProps } from "@byteark/byteark-player-angular";

@Component({
  selector: "app-sample-blog",
  standalone: true,
  imports: [ByteArkPlayerContainer],
  template: ` <byteark-player-container [options]="options"></byteark-player-container> `,
})
export class SampleBlogComponent {
  title = "ByteArk Player Container | Sample Blog";
  options: ByteArkPlayerContainerProps = {
    playerEndpoint: "https://my-custom-endpoint.byteark.com",
    lazyload: true,
    fluid: true,
    autoplay: false,
    aspectRatio: "16:9",
    poster: "https://example.com/poster.jpg",
    sources: [
      {
        src: "https://example.com/video.mp4",
        type: "video/mp4",
        title: "Sample Video",
      },
    ],
  };
}
```

## Advanced Usages

### Controlling Players

You may access the player instance from `onReady` callback parameter.

```typescript
import { Component } from "@angular/core";
import { ByteArkPlayerContainer, type ByteArkPlayerContainerProps, type ByteArkPlayer } from "@byteark/byteark-player-angular";

@Component({
  selector: "app-sample-blog",
  standalone: true,
  imports: [ByteArkPlayerContainer],
  template: ` <byteark-player-container [options]="options"></byteark-player-container> `,
})
export class SampleBlogComponent {
  title = "ByteArk Player Container | Sample Blog";
  player: ByteArkPlayer | null = null;
  options: ByteArkPlayerContainerProps = {
    playerEndpoint: "https://my-custom-endpoint.byteark.com",
    lazyload: true,
    fluid: true,
    autoplay: false,
    aspectRatio: "16:9",
    poster: "https://example.com/poster.jpg",
    sources: [
      {
        src: "https://example.com/video.mp4",
        type: "video/mp4",
        title: "Sample Video",
      },
    ],
  };
  onReady(player: ByteArkPlayer) {
    this.player = player;
  }
}
```

### Using VideoJS Plugins

You can use VideoJS plugins with ByteArk Player Container.

```typescript
import { Component } from "@angular/core";
import { ByteArkPlayerContainer, type ByteArkPlayerContainerProps } from "@byteark/byteark-player-angular";

@Component({
  selector: "app-sample-blog",
  standalone: true,
  imports: [ByteArkPlayerContainer],
  template: ` <byteark-player-container [options]="options"></byteark-player-container> `,
})
export class SampleBlogComponent {
  title = "ByteArk Player Container | Sample Blog";
  options: ByteArkPlayerContainerProps = {
    playerEndpoint: "https://my-custom-endpoint.byteark.com",
    lazyload: true,
    fluid: true,
    autoplay: false,
    aspectRatio: "16:9",
    poster: "https://example.com/poster.jpg",
    sources: [
      {
        src: "https://example.com/video.mp4",
        type: "video/mp4",
        title: "Sample Video",
      },
    ],
  };
  onReady(player: ByteArkPlayer) {
    // The player is ready! Initialize plugins here.
  }
}
```

### Request Media/Encryption with credentials

```typescript
import { Component } from "@angular/core";
import { ByteArkPlayerContainer, type ByteArkPlayerContainerProps } from "@byteark/byteark-player-angular";

@Component({
  selector: "app-sample-blog",
  standalone: true,
  imports: [ByteArkPlayerContainer],
  template: ` <byteark-player-container [options]="options"></byteark-player-container> `,
})
export class SampleBlogComponent {
  title = "ByteArk Player Container | Sample Blog";
  options: ByteArkPlayerContainerProps = {
    playerEndpoint: "https://my-custom-endpoint.byteark.com",
    lazyload: true,
    fluid: true,
    autoplay: false,
    aspectRatio: "16:9",
    poster: "https://example.com/poster.jpg",
    sources: [
      {
        src: "https://example.com/video.mp4",
        type: "video/mp4",
        title: "Sample Video",
      },
    ],
    html5: {
      hlsjs: {
        xhrSetup: function (xhr: XMLHttpRequest, url: string) {
          xhr.withCredentials = true;
        },
      },
    },
  };
  onReady(player: ByteArkPlayer) {
    // The player is ready! Initialize plugins here.
  }
}
```

## License

MIT © [ByteArk Co. Ltd.](https://github.com/byteark)
