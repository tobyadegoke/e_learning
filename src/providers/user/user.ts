import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getStudentCourses(department, semester){
    return this.http.get('http://localhost:82/myapp/student_user/courses?department='+ department + '&semester='+ semester);
  }

  editStudentProfile(studentData){
    return this.http.post('http://localhost:82/myapp/student_user/edit_profile', studentData);
  }

  getCourseDetail(code){
    return this.http.get('http://localhost:82/myapp/student_user/course_detail?courseCode='+ code);
  }

  getStudentNotifications(semester, department){
    return this.http.get('http://localhost:82/myapp/student_user/notifications?semester='+ semester + '&department='+ department);
  }

  getStudentForumPosts(semester, department){
    return this.http.get('http://localhost:82/myapp/student_user/forum_posts?semester='+ semester + '&department='+ department);
  }

  addForumPost(postData){
    return this.http.post('http://localhost:82/myapp/student_user/add_forum_post', postData);
  }

  getForumTitlesByEmail(email){
    return this.http.get('http://localhost:82/myapp/student_user/forum_posts_by_email?email='+ email);
  }

  removeForumPost(forumID){
    return this.http.post('http://localhost:82/myapp/student_user/remove_forum_post', forumID);
  }

  getLecturerCourses(lecturerEmail){
    return this.http.get('http://localhost:82/myapp/lecturer_user/courses?email='+ lecturerEmail);
  }

  createQuiz(quizData){
    return this.http.post('http://localhost:82/myapp/lecturer_user/createQuiz', quizData);
  }

}
