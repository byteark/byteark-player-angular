import { Component } from '@angular/core';

import {
  ByteArkPlayerContainer,
  ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { Video, videos } from '../../../data/videos';
import { VideoListComponent } from '../../../components/video-list.component';
import { VideoInfoComponent } from '../../../components/video-info.component';
import { SiteNavComponent } from '../../../components/site-nav.component';

@Component({
  selector: 'app-sample-fill',
  standalone: true,
  imports: [
    SiteNavComponent,
    ByteArkPlayerContainer,
    VideoInfoComponent,
    VideoListComponent,
  ],
  templateUrl: './sample-fill.component.html',
})
export class SampleFillComponent {
  title = 'ByteArk Player Container | Fill Layout Example';
  videos = videos;
  video = videos[0];

  get options(): ByteArkPlayerContainerProps {
    return {
      fill: true,
      autoplay: false,
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
