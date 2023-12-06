import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  createNewBlog: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createNewBlog = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      content: ['', Validators.required],
      date: [
        '',
        Validators.required,
        // date follows the pattern 'YYYY-MM-DD'
        Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
      ],
    });
  }

  handleBlogCreated() {
    console.log(this.createNewBlog.value);
  }
}
