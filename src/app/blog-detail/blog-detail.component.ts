import { Component, Input } from '@angular/core';

import { BlogRaw } from '../model/blog.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent {
  @Input() blog!: BlogRaw;
}
