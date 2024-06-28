import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { BookComponent } from './book/book.component';

export const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'books', component: BookComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' }
];
