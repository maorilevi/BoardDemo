import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Card } from '../models/card.model';
import { Observable } from 'rxjs';
import { CardsService } from '../services/cards.service';

@Injectable({providedIn: 'root'})
export class AllCardsResolver implements Resolve<Card[]>{
  constructor(private cardsService: CardsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Card[]> | Promise<Card[]> | Card[] {
    return this.cardsService.getAllCards();
  }
}
