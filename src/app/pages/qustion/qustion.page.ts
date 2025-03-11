import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services/question';

@Component({
  selector: 'app-qustion',
  templateUrl: './qustion.page.html',
  styleUrls: ['./qustion.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QustionPage implements OnInit {

  public data: DataService = inject(DataService);
  private route = inject(ActivatedRoute);
  public question!: Question

  constructor() { }

  ngOnInit() {
    let questionId = this.route.snapshot.paramMap.get('id');
    if(!questionId) {
      questionId = '0';
    } if (questionId == '0') {
      this.question = this.data.getNewQuestions();
    } else {
      this.question = this.data.getQuestion(questionId) || this.data.getNewQuestions();
    }
  }

}
