import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BookComponent } from './book/book.component';
import { OpenLibraryService } from './services/trending-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorComponent } from './author/author.component';
import { ImagemodalComponent } from './imagemodal/imagemodal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  // Deklarálja az alkalmazás komponenseit
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BookComponent,
    AuthorComponent,
    ImagemodalComponent
  ],
  imports: [
    // Importálja az alkalmazáshoz szükséges modulokat
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [OpenLibraryService],// Megadja a szolgáltatókat, amelyeket az alkalmazás használ
  bootstrap: [AppComponent]
})
export class AppModule { }
