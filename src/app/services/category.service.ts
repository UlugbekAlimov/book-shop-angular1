import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private firestore: Firestore) {}

  getCategories(): Observable<any[]> {
    const categoryCollection = collection(this.firestore, 'categories');
    return collectionData(categoryCollection, { idField: 'id' });
  }
}
