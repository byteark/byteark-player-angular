import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';

import { ByteArkPlayer, ByteArkPlayerContainer, ByteArkPlayerContainerProps } from 'byteark-player-angular';

import { SiteNavComponent } from '../../components/site-nav.component';
import { VideoInfoComponent } from '../../components/video-info.component';
import { videos } from '../../data/videos';

import { CustomPlaceholderComponent } from './custom-placeholder/custom-placeholder.component';

@Component({
  selector: 'app-sample-customer-placeholder',
  imports: [CustomPlaceholderComponent, ByteArkPlayerContainer, SiteNavComponent, VideoInfoComponent],
  templateUrl: `./sample-custom-placeholder.component.html`,
})
export class SampleCustomPlaceholderComponent implements OnInit {
  title = 'ByteArk Player Container | Sample Customer Placeholder';
  @ViewChild('placeholderTemplateRef', { static: true })
  placeholderTemplateRef!: TemplateRef<unknown>;
  video = videos[0];

  player?: ByteArkPlayer;
  options: ByteArkPlayerContainerProps = {
    fluid: false,
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
    onPlayerCreated: (player) => {
      this.player = player;
    },
  };

  async onClickPlaceholder() {
    await this.player?.play();
  }

  ngOnInit() {
    this.options.placeholderTemplate = this.placeholderTemplateRef;
  }
}
