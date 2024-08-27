import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';

const routes: Routes = [
  // Üres útvonal esetén átirányítás a 'home' útvonalra
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Az 'home' útvonalhoz rendeli a HomeComponent-et
  { path: 'home', component: HomeComponent },
  // A 'search' útvonalhoz rendeli a HomeComponent-et
  { path: 'search', component: HomeComponent },
  // Az 'book/:id' útvonalhoz rendeli a BookComponent-et és az azonosítót paraméterként továbbítja
  { path: 'book/:id', component: BookComponent },
  // Az 'author/:id' útvonalhoz rendeli az AuthorComponent-et és az azonosítót paraméterként továbbítja
  { path: 'author/:id', component: AuthorComponent },
  // Az ismeretlen útvonalakhoz rendeli a HomeComponent-et
  { path: '**', component: HomeComponent }
];
/**
 * Az AppRoutingModule az alkalmazás útvonalainak modulja, amely beállítja az alkalmazás útvonalait és a hozzájuk rendelt komponenseket
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
