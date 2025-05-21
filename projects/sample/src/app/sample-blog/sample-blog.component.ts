import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ByteArkPlayerContainer } from 'byteark-player-angular';

import { SiteHeaderComponent } from '../../components/site-header.component';
import { videos } from '../../data/videos';

import type { ByteArkPlayerContainerProps } from 'byteark-player-angular';

@Component({
  selector: 'app-sample-blog',
  imports: [CommonModule, RouterLink, SiteHeaderComponent, ByteArkPlayerContainer],
  templateUrl: './sample-blog.component.html',
})
export class SampleBlogComponent {
  title = 'ByteArk Player Container | Sample Blog';

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
  };
}
