import { Routes } from '@angular/router';
import { SampleBlogComponent } from './sample-blog/sample-blog.component';
import { SampleFluidComponent } from './sample-fluid/sample-fluid.component';
import { SampleFillComponent } from './sample-fill/sample-fluid/sample-fill.component';
import { SampleFullComponent } from './sample-full/sample-full.component';
import { SampleLazyLoadComponent } from './sample-lazy-load/sample-lazy-load.component';
import { SampleAutoplayComponent } from './sample-autoplay/sample-autoplay.component';
import { SampleAdsComponent } from './sample-ads/sample-ads.component';

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
];
