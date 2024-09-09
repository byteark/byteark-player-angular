import { Component } from '@angular/core';
import {
  ByteArkPlayerContainer,
  ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { VideoInfoComponent } from '../../components/video-info.component';
import { SiteNavComponent } from '../../components/site-nav.component';
import { videos } from '../../data/videos';

@Component({
  selector: 'app-sample-autoplay',
  standalone: true,
  imports: [ByteArkPlayerContainer, VideoInfoComponent, SiteNavComponent],
  templateUrl: './sample-autoplay.component.html',
})
export class SampleAutoplayComponent {
  title = 'ByteArk Player Container | Autoplay Example';
  video = videos[0];

  options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: 'any',
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
