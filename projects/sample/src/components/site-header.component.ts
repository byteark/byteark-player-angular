import { Component } from '@angular/core';

@Component({
  selector: 'site-header',
  standalone: true,
  template: `
    <div
      class="container"
      style="text-align: center; padding-top: 15vh; padding-bottom: 15vh"
    >
      <h1 class="text-3xl">ByteArk Player Container for Angular</h1>
    </div>
  `,
  styles: ``,
})
export class SiteHeaderComponent {}
