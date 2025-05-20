import { Routes } from '@angular/router';

import { SampleAdsComponent } from './sample-ads/sample-ads.component';
import { SampleAutoplayComponent } from './sample-autoplay/sample-autoplay.component';
import { SampleBlogComponent } from './sample-blog/sample-blog.component';
import { SampleCustomPlaceholderComponent } from './sample-custom-placeholder/sample-custom-placeholder.component';
import { SampleFillComponent } from './sample-fill/sample-fluid/sample-fill.component';
import { SampleFluidComponent } from './sample-fluid/sample-fluid.component';
import { SampleFullComponent } from './sample-full/sample-full.component';
import { SampleLazyLoadComponent } from './sample-lazy-load/sample-lazy-load.component';

export const routes: Routes = [
  {
    path: '',
    component: SampleBlogComponent,
  },
  {
    path: 'fluid',
    component: SampleFluidComponent,
  },
  {
    path: 'fill',
    component: SampleFillComponent,
  },
  {
    path: 'full',
    component: SampleFullComponent,
  },
  {
    path: 'lazy-load',
    component: SampleLazyLoadComponent,
  },
  {
    path: 'autoplay',
    component: SampleAutoplayComponent,
  },
  {
    path: 'ads',
    component: SampleAdsComponent,
  },
  {
    path: 'custom-placeholder',
    component: SampleCustomPlaceholderComponent,
  },
];
