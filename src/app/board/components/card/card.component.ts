import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../../models/card.model';
import { BehaviorSubject } from 'rxjs';

import * as moment from 'moment';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  card = new BehaviorSubject<Card>(null);
  tempMoment = moment;
  @Input() isCreateNewCardComponent = false;
  @Input() set Card(card: Card) {
    this.card.next(card);
  }
  get Card(): Card { return this.card.getValue(); }

  @Output() onCardClicked = new EventEmitter<Card>();
  @Output() onCreateCardClicked = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onCardCLick(): void {
    if (!this.card.getValue()) {
      this.onCreateCardClicked.emit(true);
    } else {
      this.onCardClicked.emit(this.card.getValue());
    }
  }
}
