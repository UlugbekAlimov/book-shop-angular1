import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"book-shop-angular-2ec4e","appId":"1:706995352969:web:ad7c2ab70c6a005ca19d58","databaseURL":"https://book-shop-angular-2ec4e-default-rtdb.firebaseio.com","storageBucket":"book-shop-angular-2ec4e.appspot.com","apiKey":"AIzaSyC6ELQLkKvD53IM3yqc5cYmWtyAIANgr_s","authDomain":"book-shop-angular-2ec4e.firebaseapp.com","messagingSenderId":"706995352969"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())]
};
