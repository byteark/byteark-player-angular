import { Component } from '@angular/core';
import {
  ByteArkPlayerContainer,
  ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { SiteNavComponent } from '../../components/site-nav.component';
import { VideoInfoComponent } from '../../components/video-info.component';
import { videos } from '../../data/videos';

@Component({
  selector: 'app-sample-ads',
  standalone: true,
  imports: [ByteArkPlayerContainer, SiteNavComponent, VideoInfoComponent],
  templateUrl: './sample-ads.component.html',
})
export class SampleAdsComponent {
  title = 'ByteArk Player Container | Advertisement Example';
  video = videos[0];

  options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: 'any',
    muted: true,
    aspectRatio: '16:9',
    poster: this.video.poster,
    sources: [
      {
        src: this.video.src,
        type: this.video.type,
        title: this.video.title,
      },
    ],
    plugins: {
      bytearkAds: {
        adTagUrl:
          'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
      },
    },
    onPlayerCreated: () => {
      console.log('Created!');
    },
    onReady: () => {
      console.log('Ready!');
    },
  };
}
