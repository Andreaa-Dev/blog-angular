import { Component, Input } from '@angular/core';
import { Blog } from '../model/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent {
  @Input() allBlogs!: Blog[];
}
