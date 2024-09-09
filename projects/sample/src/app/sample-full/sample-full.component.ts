import { Component } from '@angular/core';
import {
  ByteArkPlayerContainer,
  ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { videos } from '../../data/videos';

@Component({
  selector: 'app-sample-full',
  standalone: true,
  imports: [ByteArkPlayerContainer],
  templateUrl: './sample-full.component.html',
})
export class SampleFullComponent {
  title = 'ByteArk Player Container | Full Page Example';
  
  options: ByteArkPlayerContainerProps = {
    fill: true,
    autoplay: false,
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
