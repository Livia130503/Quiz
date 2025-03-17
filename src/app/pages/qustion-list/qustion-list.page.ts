import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonItem, IonList, IonLabel, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Question } from 'src/app/services/question';

@Component({
  selector: 'app-qustion-list',
  templateUrl: './qustion-list.page.html',
  styleUrls: ['./qustion-list.page.scss'],
  standalone: true,
  imports: [IonItemOptions, IonItemOption, IonItemSliding, IonLabel, IonList, IonItem, IonIcon, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QustionListPage implements OnInit {

  public data = inject(DataService);
  private router = inject(Router);


  constructor() { }

  ngOnInit() {
  }

  show(qid: string) {
    this.router.navigate(['/qustion', qid]);
    }

  delete(q: Question) {
    this.data.deleteQuestion(q);

  }


}
