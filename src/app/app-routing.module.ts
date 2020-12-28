import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/board/home', pathMatch: 'full'
  }, {
    path: 'board',
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{}
