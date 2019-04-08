export class Forum {
  id?: string;
  title: string;
  description: string;
  created?: any;
  likes?: string[];
  commentsCount?: number;
  closed?: boolean;
  author: string;

  constructor(data?: any) {
    data = data || {};
    this.id = data.id || "";
    this.title = data.title || "";
    this.description = data.description || "";
    this.created = data.created || "";
    this.likes = data.likes || "";
    this.closed = data.closed || false;
    this.author = data.author || "";
  }
}

export class ForumComment {
  id?: string;
  forumId: string;
  authorId: string;
  message: string;
  created: any;
  author: string;
  votes?: string[];

  constructor(data?: any) {
    data = data || {};
    this.id = data.id || "";
    this.forumId = data.forumId || "";
    this.authorId = data.authorId || "";
    this.message = data.message || "";
    this.created = data.created || "";
    this.author = data.author || "";
  }
}
