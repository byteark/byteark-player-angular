import { Component } from '@angular/core';
import {
  ByteArkPlayerContainer,
  ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { videos } from '../../data/videos';
import { SiteNavComponent } from '../../components/site-nav.component';
import { VideoInfoComponent } from '../../components/video-info.component';

@Component({
  selector: 'app-sample-lazy-load',
  standalone: true,
  imports: [ByteArkPlayerContainer, SiteNavComponent, VideoInfoComponent],
  templateUrl: './sample-lazy-load.component.html',
})
export class SampleLazyLoadComponent {
  title = 'ByteArk Player Container | Lazy Load Example';
  video = videos[0];

  options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    lazyload: true,
    aspectRatio: '16:9',
    poster: this.video.poster,
    sources: [
      {
        src: this.video.src,
        type: this.video.type,
        title: this.video.title,
      },
    ],
    onPlayerCreated: () => {
      console.log('Created!');
    },
    onReady: () => {
      console.log('Ready!');
    },
  };
}
