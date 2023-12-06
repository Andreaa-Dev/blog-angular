import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'blog-app';
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

  showCreate = false;
  // logic to create new form
  showCreateForm() {
    this.showCreate = true;
  }
}
