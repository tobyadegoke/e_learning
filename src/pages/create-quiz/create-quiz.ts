import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-create-quiz',
  templateUrl: 'create-quiz.html',
})
export class CreateQuizPage {
  createQuizForm: FormGroup;
  courses;
  user;
  lecturerEmail;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fb: FormBuilder, 
    public userService: UserProvider
  ) {
    this.lecturerEmail = localStorage.getItem('myappEmail');
    console.log(this.lecturerEmail);
    this.userService.getLecturerCourses(this.lecturerEmail).subscribe((resp)=>{
      this.courses = resp;
    });
    
    this.createQuizForm = fb.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      questions: ['', Validators.compose([Validators.required, Validators.maxLength(280)])],
      correctAnswers: ['', Validators.compose([Validators.required, Validators.maxLength(280)])],
      courseCode: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateQuizPage');
  }

  createQuiz(){
    let data = this.createQuizForm.value;

    let quizData = {
      courseCode: data.courseCode,
      title: data.title, 
      questions: data.questions,
      correctAnswers: data.correctAnswers
    }

    console.log(quizData);
    this.userService.createQuiz(quizData).subscribe((resp) => {
      if(resp['msg'] == "Successful"){
        console.log('Quiz created successfully');
      }
    });
  }

}
