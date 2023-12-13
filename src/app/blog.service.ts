import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Blog } from './model/blog.model';
import { BlogRaw } from './model/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/blogs'; // Adjust the API URL to match json-server

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<BlogRaw[]> {
    return this.http.get<BlogRaw[]>(this.apiUrl);
  }

  getBlog(id: number): Observable<BlogRaw> {
    return this.http.get<BlogRaw>(`${this.apiUrl}/${id}`);
  }

  addBlog(blog: BlogRaw): Observable<BlogRaw> {
    return this.http.post<BlogRaw>(this.apiUrl, blog);
  }

  updateBlog(blog: BlogRaw): Observable<BlogRaw> {
    return this.http.put<BlogRaw>(`${this.apiUrl}/${blog.id}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
