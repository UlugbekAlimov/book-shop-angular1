import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { BooksComponent } from './books/books.component';

export const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'books', component: BooksComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' }
];
