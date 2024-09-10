# ByteArk Player Container for Angular

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)
- [Example](#example)
- [License](#license)

## Getting Started

This guide will help you set up and run the ByteArk Player Container for Angular.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Install the package:**

   ```sh
   npm install byteark-player-angular
   # or
   yarn add byteark-player-angular
   # or
   pnpm add byteark-player-angular
   # or
   bun add byteark-player-angular
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
     templateUrl: "./sample-blog.component.html",
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

## Customization

More information about customizations and configurations of the player will be added soon.

## Example

Here's a complete example of how to use the ByteArk Player Container in an Angular component:

```typescript
import { Component } from "@angular/core";
import { ByteArkPlayerContainer, type ByteArkPlayerContainerProps } from "@byteark/byteark-player-angular";

@Component({
  selector: "app-sample-blog",
  standalone: true,
  imports: [ByteArkPlayerContainer],
  template: `
    <h1>{{ title }}</h1>
    <byteark-player-container [options]="options"></byteark-player-container>
  `,
})
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

## License

MIT © [ByteArk Co. Ltd.](https://github.com/byteark)
