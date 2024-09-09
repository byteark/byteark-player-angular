import { Component } from '@angular/core';
import { SiteNavComponent } from '../../components/site-nav.component';
import { VideoInfoComponent } from '../../components/video-info.component';
import { Video, videos } from '../../data/videos';

import {
  ByteArkPlayerContainer,
  ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { VideoListComponent } from '../../components/video-list.component';

@Component({
  selector: 'app-sample-fluid',
  standalone: true,
  imports: [
    SiteNavComponent,
    VideoInfoComponent,
    ByteArkPlayerContainer,
    VideoListComponent,
  ],
  templateUrl: './sample-fluid.component.html',
})
export class SampleFluidComponent {
  title = 'ByteArk Player Container | Fluid Layout Example';
  videos = videos;
  video = videos[0];

  get options(): ByteArkPlayerContainerProps {
    return {
      fluid: true,
      autoplay: false,
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

  set options(options: ByteArkPlayerContainerProps) {
    this.options = options;
  }

  onVideoSelected(video: Video) {
    this.video = video;
  }
}
