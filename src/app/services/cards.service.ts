import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Card } from '../models/card.model';
import { first, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CardsService {
  cardsState = [];
  cards = new BehaviorSubject<Card[]>(null);
  constructor(private http: HttpClient) {}
  getAllCards(): Observable<Card[]> {

    this.cardsState = JSON.parse(localStorage.getItem('list'));
    const one = new Observable<Card[]>(observer => {
      observer.next(this.cardsState);
      observer.complete();
    });
    return one.pipe(map(value => {
      return value;
    }));
    // return this.http.get<Card[]>(environment.serverUrl + '/cards');
  }
  addCard(newCard: Card): void {
    this.cardsState.push(newCard);
    this.cards.next(this.cardsState);
    this.saveToLocalStorage();
    // return this.http.post<Card>(environment.serverUrl + '/cards', newCard);
  }
  updateCard(updatedCard: Card): void {
    const idx = this.cardsState.findIndex(card => card.id === updatedCard.id);
    if (idx >= 0) {
      this.cardsState[idx] = {
        ...updatedCard
      };
    }
    this.saveToLocalStorage();
    this.cards.next(this.cardsState);
    // return this.http.put<Card>(environment.serverUrl + `/cards/${updatedCard.id}`, updatedCard);
  }
  deleteCard(cardId: string): void {
    const idx = this.cardsState.findIndex(card => card.id === cardId);
    this.cardsState.splice(idx, 1);
    this.cards.next(this.cardsState);
    this.saveToLocalStorage();
    // return this.http.delete<any>(environment.serverUrl + `/cards/${cardId}`);
  }
  saveToLocalStorage(): void {
    localStorage.setItem('list', JSON.stringify(this.cardsState));
  }
}
// [
//   {
//     id: '11',
//     authorId: '123',
//     authorName: 'Maor Levi',
//     content: 'bla bla',
//     date: new Date(),
//   },
//   {
//     id: '11',
//     authorId: '123',
//     authorName: 'Maor Levi',
//     content: 'bla bla',
//     date: new Date(),
//   },
//   {
//     id: '11',
//     authorId: '123',
//     authorName: 'Maor Levi',
//     content: 'bla bla',
//     date: new Date(),
//   },
//   {
//     id: '11',
//     authorId: '123',
//     authorName: 'Maor Levi',
//     content: 'bla bla',
//     date: new Date(),
//   },
//   {
//     id: '11',
//     authorId: '123',
//     authorName: 'Maor Levi',
//     content: 'bla bla',
//     date: new Date(),
//   },
//   {
//     id: '11',
//     authorId: '123',
//     authorName: 'Maor Levi',
//     content: 'bla bla',
//     date: new Date(),
//   }
//
// ]
