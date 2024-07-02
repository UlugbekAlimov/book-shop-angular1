import { Injectable } from '@angular/core';
import { Firestore, collection , addDoc, getDocs , doc , updateDoc , deleteDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection;

  constructor(private firestore: Firestore, private snackBar: MatSnackBar) {
    this.categoryCollection = collection(this.firestore, 'categories');
  }

  getCategories(): Observable<any[]> {
    return from(getDocs(this.categoryCollection).then(snapshot => {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }));
  }

  addCategory(name: string): Promise<any> {
    return this.getCategories().toPromise().then(categories => {
      if (!categories) {
        throw new Error('Категории не найдены');
      }
      const checkingCategory = categories.find(category => category.name.toLowerCase() === name.toLowerCase());
      if (checkingCategory) {
        const errorMsg = `Категория с именем '${name}' уже существует`;
        this.snackBar.open(errorMsg, 'Закрыть', {
          duration: 5000, 
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        throw new Error(errorMsg);
      } else {
        return addDoc(this.categoryCollection, { name });
      }
    }).catch(error => {
      console.error('Ошибка при добавлении категории:', error);
      throw error;
    });
  }

  updateCategory(categoryId: string, newName: string): Promise<void> {
    const categoryDoc = doc(this.firestore, 'categories', categoryId);
    return updateDoc(categoryDoc, { name: newName });
  }

  deleteCategory(categoryId: string): Promise<void> {
    const categoryDoc = doc(this.firestore, 'categories', categoryId);
    return deleteDoc(categoryDoc);
  }

}
