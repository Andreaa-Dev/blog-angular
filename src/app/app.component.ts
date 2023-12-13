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
        const result = v.map((item) => ({
          ...item,
          showDetail: false,
          showEdit: false,
        }));
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
    this.blogService.addBlog(newBlogRaw).subscribe({
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

  toggleBlogEdit(blog: BlogRaw) {
    const foundBlog = this.blogs.find((item) => item.id === blog.id);
    if (foundBlog) {
      foundBlog.showEdit = !foundBlog.showEdit;
    }
  }

  // delete blog
  deleteBlog(blogId: number) {
    // subscribe - deal with response
    this.blogService.deleteBlog(blogId).subscribe({
      next: () => {
        this.showCreate = false;
        this.fetchBlogs();
      },
      error: (error) => {
        console.error('Error creating blog:', error);
      },
    });
    this.fetchBlogs();
  }

  // edit
  handleBlogUpdated(blog: BlogRaw) {
    this.blogService.updateBlog(blog).subscribe({
      next: (v) => {
        this.showCreate = false;
        this.blog = v;
        this.fetchBlogs();
      },
      error: (error) => {
        console.error('Error creating blog:', error);
      },
    });
  }
}
