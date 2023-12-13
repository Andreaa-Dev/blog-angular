import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogRaw } from '../model/blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  @Output() blogCreated = new EventEmitter<BlogRaw>();
  createNewBlog: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.createNewBlog = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      content: ['', Validators.required],
      date: [
        '',
        Validators.required,
        // // date follows the pattern 'YYYY-MM-DD'
        // Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
      ],
    });
  }

  handleBlogCreated() {
    const newBlog: BlogRaw = this.createNewBlog.value;
    // Emit the blog data
    this.blogCreated.emit(newBlog);
  }
}
