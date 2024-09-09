import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'site-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class=" bg-gray-100">
      <div
        class="max-w-screen-lg mx-auto flex items-center justify-between py-4"
      >
        <a
          routerLink="/"
          class="text-xl font-medium text-black hover:no-underline hover:text-black"
        >
          ByteArk Player Container for Angular
        </a>
        <a
          routerLink="/"
          class="text-gray-500 hover:text-gray-700 hover:no-underline"
        >
          <span class="mr-1">&#8592;</span>
          <span>Back to Home</span>
        </a>
      </div>
    </header>
  `,
})
export class SiteNavComponent {}
