import { Component, Input } from '@angular/core';
import { BlogRaw } from '../model/blog.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent {
  @Input() allBlogs!: BlogRaw[];
}
