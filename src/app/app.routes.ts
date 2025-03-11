import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'qustion-list',
    loadComponent: () => import('./pages/qustion-list/qustion-list.page').then( m => m.QustionListPage)
  },
  {
    path: 'qustion/:id',
    loadComponent: () => import('./pages/qustion/qustion.page').then( m => m.QustionPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.page').then( m => m.QuizPage)
  },
];
