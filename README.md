# Angular Blog Platform

## Introduction

In this project, you'll create a blog platform using Angular, focusing on core topics such as Directives, Pipes, Forms, Services, and HTTP operations. Users can create, edit, and delete blog posts. Blog application will use json-server as a mock backend

## Description

- On the Blog Platform, users can:

  - Create a new blog post with a title, author, content, and date.
  - View a list of all blog posts.
  - Read the full content of a blog post.
  - Edit existing posts.
  - Delete posts.

- App outlook:
  - No routing/navigation needed.
  - Main app just display a list of all blogs.
  - Clicking on each row/card (single blog) would show/hide details of that blog.
  - In each row/card, there should be edit/delete button as well.
  - Clicking on edit/delete button should enable the coresponding feature.
  - There should be button to create new blog in the main app.

## Prerequisites

- Ensure you're familiar with:

    - Structural Directives like *ngIf and *ngFor.
    - Creation of custom directives.
    - Use of built-in pipes and creation of custom pipes.
    - Angular Forms: Template-Driven and Reactive Forms.
    - Form validation and custom validators.
    - Deep understanding of Angular services and dependency injection.
    - CRUD operations using the HttpClient module.

- Ensure you have json-server installed. If not, install it globally:
    - Install json-server globally: `npm install -g json-server`
    - Run `json-server --watch blogs.json` or `npm run server` to start the mock backend server

## Guidelines

1. Generating components:

   - Use the Angular CLI to generate the main components:

   ```
   ng generate component blog-list
   ng generate component blog-detail
   ng generate component blog-create
   ng generate component blog-edit
   ng generate service blog
   ```

2. `Blog` Model:

   - Create a `blog.model.ts` file. Define an interface for the blog post with attributes id, title, author, content, and date.
   - Example:

   ```
   export interface BlogRaw {
        id: number;
        title: string;
        author: string;
        content: string;
        date: Date;
    }

    export interface Blog extends BlogRaw {
        showDetail: boolean;  // Added for toggle functionality
    }

   ```

3. `BlogListComponent`:

   - Display a list of all blog posts. Incorporate options to view full content, edit, or delete a post. Use `*ngFor` to iterate over the list of posts.

4. `BlogDetailComponent`:

   - Display the full content of a selected blog post. This component should also have options to edit or delete the current post.

5. `BlogCreateComponent`:

   - A form to capture a new blog post's details. Utilize Angular Forms and validate inputs before submission.

6. `BlogEditComponent`:

   - A form that allows users to edit an existing blog post, similar to BlogCreateComponent. Ensure you validate inputs.

7. `BlogService`:

   - Define a blog.service.ts that handles CRUD operations. Use the HttpClient module to interact with a backend or mock data in a blogs.json file.
   - Sample `blog.service.ts`:
   ```
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { Blog } from './blog.model';

    @Injectable({
    providedIn: 'root'
    })
    export class BlogService {
        private apiUrl = 'http://localhost:3000/blogs';  // Adjust the API URL to match json-server

        constructor(private http: HttpClient) {}

        getBlogs(): Observable<BlogRaw[]> {
            return this.http.get<BlogRaw[]>(this.apiUrl);
        }

        getBlog(id: number): Observable<BlogRaw> {
            return this.http.get<BlogRaw>(`${this.apiUrl}/${id}`);
        }

        addBlog(blog: Blog): Observable<BlogRaw> {
            return this.http.post<BlogRaw>(this.apiUrl, blog);
        }

        updateBlog(blog: Blog): Observable<BlogRaw> {
            return this.http.put<BlogRaw>(`${this.apiUrl}/${blog.id}`, blog);
        }

        deleteBlog(id: number): Observable<void> {
            return this.http.delete<void>(`${this.apiUrl}/${id}`);
        }
    }
   ```

8. Directives & Pipes:

   - If certain posts have specific tags or markers, create a custom directive to highlight them or alter their appearance.
   - Use built-in pipes to format data, like dates. You can also create a custom pipe, for instance, to truncate post content in the list view.

9. `AppComponent`:

   - Design the main structure. It should have a title and display the list of posts by default. Include options to create a new post and view full content of an existing one.

   - Sample `app.component.html`:

   ```
    <div class="container">
        <h1>Welcome to the Blog App</h1>

        <!-- Create New Blog Button -->
        <button (click)="showCreateForm()">Create New Blog</button>

        <!-- Create Blog Form -->
        <app-blog-create *ngIf="showCreate" (blogCreated)="handleBlogCreated($event)"></app-blog-create>

        <!-- Displaying a List of Blogs -->
        <div *ngFor="let blog of blogs">
            <h3 (click)="toggleBlogDetail(blog)">{{ blog.title }} - {{ blog.date | date }}</h3>
            <!-- Show/Hide Blog Detail -->
            <div *ngIf="blog.showDetail">
            <app-blog-detail [blog]="blog"></app-blog-detail>
            <button (click)="showEditForm(blog)">Edit</button>
            <button (click)="deleteBlog(blog)">Delete</button>

            <!-- Edit Blog Form -->
            <app-blog-edit *ngIf="blog.showEdit" [blog]="blog" (blogUpdated)="handleBlogUpdated($event)"></app-blog-edit>
            </div>
        </div>
    </div>
   ```