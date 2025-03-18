import { Component, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel, IonList, IonItem, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonList, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class HomePage {
  public data = inject(DataService);
  private router = inject(Router);
  
  constructor() {
    
  }

  showList() {
    this.router.navigate(['/qustion-list']);
    }

  startQuiz() {
    this.router.navigate(['/quiz']);
    }
}
