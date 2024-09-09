# ByteArk Player Container for Angular

## Getting Started

This guide will help you set up and run the ByteArk Player Container for Angular.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the project:**

   ```sh
   git clone git@github.com:maxmurr/byteark-player-angular-demo.git
   cd byteark-player-angular-demo
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the application:**

   ```sh
   npm run start
   # or
   yarn start
   # or
   pnpm start
   # or
   bun start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:4200
   ```

### Usage

To use the ByteArk Player Container in your Angular application, follow these steps:

1. **Import the ByteArk Player Container component:**

   ```typescript
   import { Component } from "@angular/core";
   import { ByteArkPlayerContainer, type ByteArkPlayerContainerProps } from "byteark-player-angular";
   import { videos } from "../videos";

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
       poster: videos[0].poster,
       sources: [
         {
           src: videos[0].src,
           type: videos[0].type,
           title: videos[0].title,
         },
       ],
     };
   }
   ```

### Customization

Writting information about customizations and configurations of the player soon.

### Example

Here is a complete example of how to use the ByteArk Player Container in an Angular component:

```typescript
import { Component } from "@angular/core";
import { ByteArkPlayerContainer, type ByteArkPlayerContainerProps } from "byteark-player-angular";
import { videos } from "../videos";

@Component({
  selector: "app-sample-blog",
  standalone: true,
  imports: [ByteArkPlayerContainer],
  templateUrl: "./sample-blog.component.html",
})
export class SampleBlogComponent {
  title = "ByteArk Player Container | Sample Blog";
  options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    aspectRatio: "16:9",
    poster: videos[0].poster,
    sources: [
      {
        src: videos[0].src,
        type: videos[0].type,
        title: videos[0].title,
      },
    ],
  };
}
```
