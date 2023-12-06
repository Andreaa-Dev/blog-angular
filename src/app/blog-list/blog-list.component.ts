import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent {
  blogs = [
    {
      id: 1,
      title: 'First Blog Title',
      date: '2023-04-22',
      author: 'John Doe',
      content: 'This is the content of the first blog.',
    },
    {
      id: 2,
      title: 'Second Blog Title',
      date: '2023-04-23',
      author: 'Jane Smith',
      content: 'This is the content of the second blog.',
    },
  ];
}
