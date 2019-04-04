export class Forum {
    id?: string;
    title: string;
    description: string;
    created?: any;
    likes?: string[];
    commentsCount?: number;
    closed?: boolean;

    constructor(data?: any) {
        data = data || {};
        this.id = data.id || "";
        this.title = data.title || "";
        this.description = data.description || "";
        this.created = data.created || "";
        this.likes = data.likes || "";
        this.closed = data.closed || false;
    }
}

export class ForumComment {
    id?: string;
    forumId: string;
    authorId: string;
    authorName: string;
    message: string;
    created: any;

    constructor(data?: any) {
        data = data || {};
        this.id = data.id || "";
        this.forumId = data.forumId || "";
        this.authorId = data.authorId || "";
        this.authorName = data.authorName || "";
        this.message = data.message || "";
        this.created = data.created || "";
    }
}
