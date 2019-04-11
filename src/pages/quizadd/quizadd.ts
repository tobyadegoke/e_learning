import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { QuizProvider } from "../../providers/quiz/quiz";
import { Quiz, Question, Answer } from "../../providers/quiz/quiz.model";

/**
 * Generated class for the QuizaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-quizadd",
  templateUrl: "quizadd.html"
})
export class QuizaddPage {
  quiz = new Quiz();
  //===============
  question = new Question();
  selectedAnswer = 0;
  //===============
  selAnswers = new Array<Answer>();
  answer = new Answer();
  prevQuestionIndx: number;
  //===============
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private quizProvider: QuizProvider
  ) {}

  ionViewDidLoad() {}

  removeQuestion(idx: number) {}

  addAnswer() {
    if (this.answer.answer) {
      this.selAnswers.push(this.answer);
      this.answer = new Answer();
    }
  }
  removeAnswer(idx: any) {
    this.selAnswers.splice(idx, 1);
  }
  setCorrectAnswer(idx: number) {
    this.selectedAnswer = idx;
    console.log(idx);
  }
  prev() {
    this.prevQuestionIndx = this.quiz.questions.length - 1;
    this.question = this.quiz.questions[this.prevQuestionIndx];
  }
  next() {
    this.question.answers = this.selAnswers;
    this.question.correctAnswerId = this.selectedAnswer;
    this.quiz.questions.push(this.question);
    this.selAnswers = new Array<Answer>();
    this.question.question = "";
    this.question = new Question();
    this.selectedAnswer = 0;
    console.log(this.quiz);
  }
  submit() {
    this.quizProvider.create(this.quiz).then(() => {
      this.navCtrl.pop();
    });
  }
}
