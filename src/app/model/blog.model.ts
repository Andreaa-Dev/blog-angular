export interface BlogRaw {
  id: number;
  title: string;
  author: string;
  content: string;
  date: Date;
}

export interface Blog extends BlogRaw {
  showDetail: boolean; // Added for toggle functionality
}
