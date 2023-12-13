import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Blog, BlogRaw } from './model/blog.model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  blogs!: Blog[];
  blog!: BlogRaw;
  showCreate = false;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (v) => {
        const result = v.map((item) => ({ ...item, showDetail: false }));
        this.blogs = result;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  fetchBlog(blog: BlogRaw) {
    this.blogService.getBlog(blog.id).subscribe({
      next: (v) => {
        this.blog = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // logic to create new form
  showCreateForm() {
    this.showCreate = true;
  }

  // handleBlogCreated(event: any) {}
  handleBlogCreated(newBlogRaw: BlogRaw) {
    const newBlog: Blog = {
      showDetail: false,
      id: newBlogRaw.id,
      title: newBlogRaw.title,
      author: newBlogRaw.author,
      content: newBlogRaw.content,
      date: newBlogRaw.date,
    };

    this.blogService.addBlog(newBlog).subscribe({
      next: () => {
        this.showCreate = false;
        this.fetchBlogs();
      },
      error: (error) => {
        console.error('Error creating blog:', error);
      },
    });
  }

  // show blog detail
  toggleBlogDetail(blog: BlogRaw) {
    const foundBlog = this.blogs.find((item) => item.id === blog.id);
    if (foundBlog) {
      foundBlog.showDetail = !foundBlog.showDetail;
      this.fetchBlog(foundBlog);
    }
  }
  // show edit form
  showEditForm(blog: BlogRaw) {
    // this.blogService.updateBlog(blog)
  }
  // delete blog
  deleteBlog(blogId: number) {
    this.blogService.deleteBlog(blogId);
  }
  // edit
  handleBlogUpdated(blog: BlogRaw) {
    const newBlog: Blog = {
      showDetail: false,
      id: blog.id,
      title: blog.title,
      author: blog.author,
      content: blog.content,
      date: blog.date,
    };

    this.blogService.updateBlog(newBlog).subscribe({
      next: () => {
        this.showCreate = false;
        this.fetchBlogs();
      },
      error: (error) => {
        console.error('Error creating blog:', error);
      },
    });
  }
}
