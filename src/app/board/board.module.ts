import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board.component';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { AllCardsResolver } from '../resolvers/all-cards.resolver';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../guards/auth.guard';
import { CardDialogComponent } from './components/card-dialog/card-dialog.component';


const appRoutes: Routes = [
  {
    path: '',
    component: BoardComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          cards: AllCardsResolver
        }
      }
    ]
  }
];
@NgModule({
  declarations: [
    BoardComponent,
    HomeComponent,
    CardComponent,
    CardDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class BoardModule { }
