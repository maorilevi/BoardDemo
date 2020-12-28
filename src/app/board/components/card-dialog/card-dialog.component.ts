import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from '../../../models/card.model';
import { CardsService } from '../../../services/cards.service';
import { Guid } from 'guid-typescript';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})
export class CardDialogComponent implements OnInit {
  cardForm: FormGroup;
  canEdit: boolean;
  card: Card;
  constructor(
    private authService: AuthenticationService,
    private cardSService: CardsService,
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
    card: Card,
    canEdit: boolean
  }) { }

  ngOnInit(): void {
    this.card = this.data.card;
    this.canEdit = this.data.canEdit;
    this.cardForm = new FormGroup({
      authorName: new FormControl(''),
      content: new FormControl('')
    });
    if (this.card) {
      this.cardForm.setValue({
        authorName: this.card.authorName,
        content: this.card.content
      });
    }
  }
  onSave(): void {
    if (this.cardForm.valid) {
      if (!this.card) {
        const newCard = {
          ...this.cardForm.getRawValue(),
          id: Guid.create().toString(),
          authorId: this.authService.getCurrentUserId(),
          date: new Date()
        };
        this.cardSService.addCard(newCard);
      } else if (!!this.card){
        let updatedCard = this.card;
        updatedCard = {
          ...updatedCard,
          ...this.cardForm.getRawValue()
        };
        this.cardSService.updateCard(updatedCard);
      }
      this.dialogRef.close();
    }
  }
  onDelete(): void {
    this.cardSService.deleteCard(this.card.id);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  handleFileInput(files: FileList): void {
    const reader = new FileReader();
    reader.readAsDataURL(files.item(0));
    reader.onload = () => {
      console.log((reader.result as string));
    };
  }
}
