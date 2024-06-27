import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksCollection;

  constructor(private firestore: Firestore) {
    this.booksCollection = collection(firestore, 'books');
  }

  getAllBooks(): Observable<Book[]> {
    return collectionData(this.booksCollection, { idField: 'id' }) as Observable<Book[]>;
  }
}
