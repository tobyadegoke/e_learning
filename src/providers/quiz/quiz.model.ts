export class Quiz {
  id?: string;
  title?: string;
  lecturerId?: string;
  course?: string;
  semester?: string;
  createdOn?: any;
  questions: Array<Question>;
  questionList?: any;

  constructor(data?: any) {
    data = data || {};
    this.id = data.id || "";
    this.title = data.title || "";
    this.course = data.course || "";
    this.semester = data.semester || "";
    this.createdOn = data.createdOn || "";
    this.questions = data.questions || new Array<Question>();
  }
}

export class Question {
  question: string;
  answers: Array<Answer>;
  correctAnswerId: number;

  constructor(data?: any) {
    data = data || {};
    this.question = data.question || "";
    this.correctAnswerId = data.correctAnswerId || 0;
    this.answers = data.answers || new Array<Answer>();
  }
}

export class Answer {
  answer: string;

  constructor(data?: any) {
    data = data || {};
    this.answer = data.answer || "";
  }
}
