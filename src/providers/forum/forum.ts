import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthServiceProvider } from '../auth-service/auth-service';
import { Forum, ForumComment } from './forum.model';

@Injectable()
export class ForumProvider {


  constructor(private fs: AngularFirestore, private authProvider: AuthServiceProvider) { }

  forumEndpoint = 'forumList'

  create(forum: Forum): Promise<void> {
    forum.id = this.fs.createId();
    forum.created = Date.now();
    forum.likes = [];
    forum.commentsCount = 0;
    return this.fs.doc(`${this.forumEndpoint}/${forum.id}`).set(forum);
  }

  getForumList(): AngularFirestoreCollection<Forum> {
    return this.fs.collection(this.forumEndpoint, _ => _.orderBy('created', 'desc'));
  }

  deleteForum(forumId: string): Promise<void> {
    return this.fs.doc(`${this.forumEndpoint}/${forumId}`).delete();
  }

  getForumById(forumId: string) {
    return this.fs.doc(`${this.forumEndpoint}/${forumId}`);
  }

  like(forumId: string) {
    let forumRef = this.getForumById(forumId);
    let sub = forumRef.valueChanges().subscribe((forum: Forum) => {
      let userId = this.authProvider.getCurrentUser().uid;
      let userIdIndex = forum.likes.indexOf(userId);
      if (userIdIndex > -1) forum.likes.splice(userIdIndex, 1);
      else forum.likes.push(userId);
      this.update(forumId, forum);
      sub.unsubscribe();
    });
  }

  hasLikied(likes: any): boolean {
    if (likes === null) return false;
    return likes.includes(this.authProvider.getCurrentUser().uid);
  }

  update(forumId: string, forum: Forum) {
    return this.fs.doc(`${this.forumEndpoint}/${forumId}`).update(forum);
  }

  saveForumComment(forumComment: ForumComment): Promise<void> {
    forumComment.id = this.fs.createId();
    forumComment.created = Date.now();
    forumComment.authorId = this.authProvider.getCurrentUser().uid;
    forumComment.authorName = this.authProvider.getCurrentUser().email.split('@')[0];
    const promise = this.fs.doc(`forumCommentList/${forumComment.id}`).set(forumComment);
    promise.then(() => {
      let sub = this.getForumById(forumComment.forumId).valueChanges().subscribe((forum: Forum) => {
        forum.commentsCount += 1;
        this.update(forum.id, forum);
        sub.unsubscribe();
      });
    });
    return promise;
  }

  getForumCommentList(forumId: string): AngularFirestoreCollection<ForumComment> {
    return this.fs.collection('forumCommentList', _ => _.orderBy('created').where("forumId", "==", forumId));
  }

}
