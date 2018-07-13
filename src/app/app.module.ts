import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { VideoPlayer } from '@ionic-native/video-player';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateQuizPage } from '../pages/create-quiz/create-quiz';
import { RemoveForumPostPage } from '../pages/remove-forum-post/remove-forum-post';
import { VideosPage } from '../pages/videos/videos';
import { AddForumPostPage } from '../pages/add-forum-post/add-forum-post';
import { ForumPage } from '../pages/forum/forum';
import { CourseDetailPage } from '../pages/course-detail/course-detail';
import { LecturerPage } from '../pages/lecturer/lecturer';
import { StudentProfileEditPage } from '../pages/student-profile-edit/student-profile-edit';
import { CoursesPage } from '../pages/courses/courses';
import { NotificationsPage } from '../pages/notifications/notifications';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { ProfilePage } from '../pages/profile/profile';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    RegistrationPage,
    LoginPage,
    NotificationsPage,
    CoursesPage,
    LecturerPage,
    StudentProfileEditPage,
    CourseDetailPage,
    ForumPage,
    AddForumPostPage,
    RemoveForumPostPage,
    VideosPage,
    CreateQuizPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    RegistrationPage,
    LoginPage,
    NotificationsPage,
    CoursesPage,
    LecturerPage,
    StudentProfileEditPage,
    CourseDetailPage,
    ForumPage,
    AddForumPostPage,
    RemoveForumPostPage,
    VideosPage,
    CreateQuizPage
  ],
  providers: [
    StatusBar,
    VideoPlayer,
    SplashScreen,
    AuthServiceProvider,
    FirebaseServiceProvider,
    UserProvider,

    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
