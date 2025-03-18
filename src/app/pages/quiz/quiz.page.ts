import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel, IonList, IonItem, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { Question } from 'src/app/services/question';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonList, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class QuizPage implements OnInit {

  public data = inject(DataService);
  private router = inject(Router);
  public question: Question | null = null;
  public selectedAnswer: number | null = null;
  public isCorrect: boolean | null = null;
  public showOverlay: boolean = false;
  public questionsAnswered: number = 0;
  public points: number = 0;

  constructor() { }

  ngOnInit() {
    this.data.shuffleQuestions();
    this.loadNextQuestion();
  }

  loadNextQuestion() {
    this.question = this.data.getNextQuestion();
    this.selectedAnswer = null;
    this.isCorrect = null;
    if (this.question) {
      this.questionsAnswered++;
    } else {
      this.showOverlay = true;
    }
  }

  submitAnswer(selectedAnswer: number) {
    this.selectedAnswer = selectedAnswer;
    if (this.question && selectedAnswer === this.question.correct) {
      this.isCorrect = true;
      this.data.incrementCorrectAnswers();
      this.points++; // Increment points for each correct answer
    } else {
      this.isCorrect = false;
    }
    setTimeout(() => this.loadNextQuestion(), 1000); // Wait 1 second before loading the next question
  }

  restartQuiz() {
    this.showOverlay = false;
    this.questionsAnswered = 0;
    this.points = 0; // Reset points
    this.data.shuffleQuestions();
    this.loadNextQuestion();
  }

  closeQuiz() {
    this.router.navigate(['/home']);
  }
}
