import { Component } from '@angular/core';
import {
  ByteArkPlayer,
  ByteArkPlayerContainer,
  ByteArkPlayerContainerError,
  ByteArkPlayerContainerState,
  type ByteArkPlayerContainerProps,
} from 'byteark-player-angular';
import { SiteHeaderComponent } from '../../components/site-header.component';
import { videos } from '../../data/videos';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SiteHeaderComponent,
    ByteArkPlayerContainer,
  ],
  templateUrl: './sample-blog.component.html',
})
export class SampleBlogComponent {
  title = 'ByteArk Player Container | Sample Blog';
  player?: ByteArkPlayer;
  error: ByteArkPlayerContainerError | null = null;
  playerContainerState: ByteArkPlayerContainerState = {
    loaded: false,
    ready: false,
    error: null,
    showPlaceholder: true,
  };
  options: ByteArkPlayerContainerProps = {
    fluid: true,
    autoplay: false,
    aspectRatio: '16:9',
    poster: videos[0].poster,
    sources: [
      {
        src: videos[0].src,
        type: videos[0].type,
        title: videos[0].title,
      },
    ],
    onPlayerCreated: (player) => {
      this.player = player;
    },
    onPlayerSetupError: (error, originalError) => {
      this.error = error;
      console.log('onPlayerSetupError', error, originalError);
    },
    onPlayerLoadError: (error, originalError) => {
      this.error = error;
      console.log('onPlayerLoadError', error, originalError);
    },
  };
}
