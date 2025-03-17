import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { Question } from './question';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public currentQuiz: Quiz = {id: '', quizName: 'newQuiz', questions: []};

  constructor() {
    this.currentQuiz.questions.push({
      id: '1',
      title: 'What is the capital of France?',
      a1: 'Paris',
      a2: 'London',
      a3: 'Berlin',
      a4: 'Madrid',
      correct: 1
      })
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

  }

  public deleteQuestion(q: Question) {
    this.currentQuiz.questions = this.currentQuiz.questions.filter(qq => qq.id !== q.id);
  }
}

