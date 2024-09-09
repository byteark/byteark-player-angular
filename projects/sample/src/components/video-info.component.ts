import { Component, Input } from '@angular/core';

@Component({
  selector: 'video-info',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1 class="text-2xl font-medium">{{ title }}</h1>
      <p class="text-gray-500 mt-4">{{ description }}</p>
    </div>
  `,
})
export class VideoInfoComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
