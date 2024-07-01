import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc , deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { query , where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksCollection;

  constructor(private firestore: Firestore) {
    this.booksCollection = collection(this.firestore, 'books');
  }

  getBooksByCategory(categoryId: string): Observable<Book[]> {
    const que = query(this.booksCollection, where('categoryId', '==', categoryId));
    return collectionData(que, { idField: 'id' }) as Observable<Book[]>;
  }

  getAllBooks(): Observable<Book[]> {
    return collectionData(this.booksCollection, { idField: 'id' }) as Observable<Book[]>;
  }

  addBook(book: Book): Promise<any> {
    return addDoc(this.booksCollection, book);
  }

  updateBook(book: Book): Promise<any> {
    const bookRef = doc(this.firestore, `books/${book.id}`);
    const updateData: { [key: string]: any } = {
      name: book.name,
      description: book.description,
      price: book.price,
      categoryId: book.categoryId
    };
    return updateDoc(bookRef, updateData);
  }

  deleteBook(bookId: string): Promise<any> {
    const bookRef = doc(this.firestore, `books/${bookId}`);
    return deleteDoc(bookRef);
  }
}