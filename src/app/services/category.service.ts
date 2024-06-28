import { Injectable } from '@angular/core';
import { Firestore, collection , addDoc, getDocs , doc , updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection;

  constructor(private firestore: Firestore) {
    this.categoryCollection = collection(this.firestore, 'categories');
  }

  getCategories(): Observable<any[]> {
    return from(getDocs(this.categoryCollection).then(snapshot => {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }));
  }

  addCategory(name: string): Promise<any> {
    return addDoc(this.categoryCollection, { name });
  }

  updateCategory(categoryId: string, newName: string): Promise<void> {
    const categoryDoc = doc(this.firestore, 'categories', categoryId);
    return updateDoc(categoryDoc, { name: newName });
  }

}
