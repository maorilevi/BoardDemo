import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from '../components/card-dialog/card-dialog.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Guid } from 'guid-typescript';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cards: Card[];
  constructor(
    private cardsService: CardsService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cards = this.activateRoute.snapshot.data.cards;
    this.cardsService.cards.asObservable().subscribe(cards => {
      if (cards) {
        this.cards = cards;
      }
    });
  }
  onCardClicked($event: Card): void {
    const canEdit = this.authService.getCurrentUserId() ===  $event.authorId;
    this.dialog.open(CardDialogComponent, {
      data: {
        card: $event,
        canEdit
      }
    });
  }

  onCreateCardClicked($event: boolean): void {
    this.dialog.open(CardDialogComponent, {
      data: {
        card: null,
        canEdit: false
      }
    });
  }
}
