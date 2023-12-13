import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogRaw, Blog } from '../model/blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent {
  @Output() blogEdited = new EventEmitter<BlogRaw>();
  @Input() blog!: Blog;
  editBlog: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.editBlog = this.fb.group({
      title: [this.blog.title, [Validators.required]],
      author: [this.blog.author, [Validators.required]],
      content: [this.blog.content, Validators.required],
      date: [
        '',
        Validators.required,
        // // date follows the pattern 'YYYY-MM-DD'
        // Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
      ],
    });
  }
  handleBlogUpdated() {
    const newBlog = { ...this.editBlog.value, id: this.blog.id };
    this.blogEdited.emit(newBlog);
  }
}
