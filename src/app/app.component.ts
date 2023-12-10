import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Blog, BlogRaw } from './model/blog.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  blogs!: Observable<BlogRaw[]>;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.blogs = this.blogService.getBlogs();
  }

  showCreate = false;
  // logic to create new form
  showCreateForm() {
    this.showCreate = true;
  }

  // handleBlogCreated(event: any) {}
  handleBlogCreated(newBlogRaw: BlogRaw) {
    const newBlog: Blog = {
      showDetail: true,
      id: newBlogRaw.id,
      title: newBlogRaw.title,
      author: newBlogRaw.author,
      content: newBlogRaw.content,
      date: newBlogRaw.date,
      // Add other properties as needed
    };

    this.blogService.addBlog(newBlog).subscribe(
      (addedBlog: BlogRaw) => {
        console.log('Blog created successfully:', addedBlog);
        this.showCreate = false;
        this.fetchBlogs();
      },
      (error) => {
        console.error('Error creating blog:', error);
      }
    );
  }
}
