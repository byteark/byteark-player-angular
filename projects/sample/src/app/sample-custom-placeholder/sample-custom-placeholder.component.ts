import { Component, TemplateRef, ViewChild } from '@angular/core';
import { videos } from '../../data/videos';
import {
  ByteArkPlayer,
  ByteArkPlayerContainer,
  ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { CustomPlaceholderComponent } from './custom-placeholder/custom-placeholder.component';
import { SiteNavComponent } from '../../components/site-nav.component';
import { VideoInfoComponent } from '../../components/video-info.component';

@Component({
  selector: 'app-sample-customer-placeholder',
  standalone: true,
  imports: [
    CustomPlaceholderComponent,
    ByteArkPlayerContainer,
    SiteNavComponent,
    VideoInfoComponent,
  ],
  templateUrl: `./sample-custom-placeholder.component.html`,
})
export class SampleCustomPlaceholderComponent {
  title = 'ByteArk Player Container | Sample Customer Placeholder';
  @ViewChild('placeholderTemplateRef', { static: true })
  placeholderTemplateRef!: TemplateRef<any>;
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
