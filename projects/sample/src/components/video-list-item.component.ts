import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Video } from '../data/videos';

@Component({
  selector: 'video-list-item',
  standalone: true,
  imports: [],
  template: `
    <li>
      <a class="flex gap-3 my-2 cursor-pointer" (click)="onVideoSelected()">
        <img
          class="rounded"
          style="width: 100px"
          [src]="poster"
          [alt]="title"
        />
        <div class="media-body">
          <p class="h6 mt-0 mb-1">{{ title }}</p>
        </div>
      </a>
    </li>
  `,
})
export class VideoListItemComponent {
  @Input() poster: string = '';
  @Input() title: string = '';
  @Input() video: Video = {
    title: '',
    poster: '',
    description: '',
    src: '',
  };
  @Output() videoSelected = new EventEmitter<Video>();

  public onVideoSelected() {
    this.videoSelected.emit(this.video);
  }
}
