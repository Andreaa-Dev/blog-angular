import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlogRaw } from '../model/blog.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent {
  @Input() blog!: BlogRaw;
  @Output() blogEdited = new EventEmitter<BlogRaw>();
  editBlog: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.editBlog = this.fb.group({
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
  handleBlogUpdated() {
    const newBlog = this.editBlog.value;
    this.blogEdited.emit(newBlog);
  }
}
