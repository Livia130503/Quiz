import { inject, Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { Question } from './question';
import { v4 as uuidv4 } from 'uuid';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private http: HttpClient = inject(HttpClient);
  public currentQuiz: Quiz = {id: '', quizName: 'newQuiz', questions: []};
  private shuffledQuestions: Question[] = [];
  private currentQuestionIndex: number = 0;
  private correctAnswersCount: number = 0;

  constructor() {
    /*this.currentQuiz.questions.push({
      id: '1',
      title: 'What is the capital of France?',
      a1: 'Paris',
      a2: 'London',
      a3: 'Berlin',
      a4: 'Madrid',
      correct: 1
      })*/
     //this.loadQuizFormJSON();
     //this.loadQuizFormMyJSON();
     this.loadQuiz();
     console.log("Hallo3");
   }

  loadQuizFormJSON() {
    this.http.get('https://www.schmiedl.co.at/json_cors/data.json').subscribe((data) => {
      if(data){
        this.currentQuiz = data as Quiz;
      } else {
        console.log("Error loading data.json");
      }
    });
  }

  loadQuizFormMyJSON() {
    this.http.get('./assets/data.json').subscribe((data) => {
      if(data){
        this.currentQuiz = data as Quiz;
      } else {
        console.log("Error loading data.json");
      }
    });
  }

  public async loadQuiz() {
    try {
      let q = await Preferences.get({key: 'Livia_Quiz'});
      console.log("Hallo1");
      if(q.value) {
        this.currentQuiz = JSON.parse(q.value) as Quiz;
        console.log(q.value);
      }
    } catch(e) {
      console.log("Error: " + e);
    }
      console.log("Hallo2");
  }

  /* Alte Variante
  public loadQuiz() {
    let returnPromise = Preferences.get({key: 'Livia_Quiz'});
    returnPromise.then((q) => {
      console.log("Hallo1");
      if(q.value) {
        this.currentQuiz = JSON.parse(q.value) as Quiz;
      }
    }).catch((e) => {
      console.log("Error: " + e);
    console.log("Hallo2");
    });
  }
  */

  public saveQuiz() {
    Preferences.set({
      key: 'Livia_Quiz', 
      value: JSON.stringify(this.currentQuiz)
    });
  }

  public getNewQuestions(): Question {
    return {
      id: '0',
      title: '',
      a1: '',
      a2: '',
      a3: '',
      a4: '',
      correct: 1
    }
  }
  
  public getQuestion(id: string): Question | undefined {
    return this.currentQuiz.questions.find(q => id === q.id);
  }

  public addQuestion(q: Question){
    if(q.id === '0') {
      q.id = uuidv4();
    }
    this.currentQuiz.questions.push(q);
    this.saveQuiz();
  }

  public deleteQuestion(q: Question) {
    this.currentQuiz.questions = this.currentQuiz.questions.filter(qq => qq.id !== q.id);
    this.saveQuiz();
  }

  public shuffleQuestions() {
    this.shuffledQuestions = [...this.currentQuiz.questions];
    for (let i = this.shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledQuestions[i], this.shuffledQuestions[j]] = [this.shuffledQuestions[j], this.shuffledQuestions[i]];
    }
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;
  }

  public getNextQuestion(): Question | null {
    if (this.currentQuestionIndex < this.shuffledQuestions.length) {
      return this.shuffledQuestions[this.currentQuestionIndex++];
    } else {
      return null;
    }
  }

  public incrementCorrectAnswers() {
    this.correctAnswersCount++;
  }

  public getCorrectAnswersCount(): number {
    return this.correctAnswersCount;
  }
}