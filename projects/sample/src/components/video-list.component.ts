import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Video } from '../data/videos';
import { VideoListItemComponent } from './video-list-item.component';

@Component({
  selector: 'video-list',
  standalone: true,
  imports: [VideoListItemComponent],
  template: `
    <div class="flex flex-col gap-3">
      <h2 className="text-lg">Recommended Videos</h2>
      <ul className="list-unstyled">
        @for (video of videos; track video.videoId) {
        <video-list-item
          [title]="video.title"
          [poster]="video.poster"
          [video]="video"
          (videoSelected)="onVideoSelected($event)"
        />
        }
      </ul>
    </div>
  `,
})
export class VideoListComponent {
  @Input() videos: Video[] = [];
  @Output() videoSelected = new EventEmitter<Video>();

  public onVideoSelected(video: Video) {
    this.videoSelected.emit(video);
  }
}
