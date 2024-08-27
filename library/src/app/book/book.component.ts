import { Component, OnInit } from '@angular/core';
import { OpenLibraryService } from '../services/trending-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { Author, Book } from '../models/book.type';
import { MatDialog } from '@angular/material/dialog';
import { ImagemodalComponent } from '../imagemodal/imagemodal.component';
import { languageNames } from '../models/languagenames';
/**
 * A BookComponent komponens, amely kezeli a könyv részleteit és nézetét
 */
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  /**
   * OpenLibraryService példány, amely a könyv adatok lekérdezését szolgáltatja
   * ActivatedRoute segítségével lekérdezhetjük az id értéket az url-ből
   * DataService segítségével kapunk paramétereket a home komponenstől
   * A Router példány, amely a navigációt szolgáltatja
   * MatDialog segít nekünk, hogy megjelnítsük a képet nagyobb méretben
   */
  constructor(
    private service: OpenLibraryService,
    private route: ActivatedRoute,
    private dataservice: DataServiceService,
    private router: Router,
    private dialog: MatDialog
  ) { }
  /**
   * Az aktuális könyv adatait tartalmazó objektum
   */
  book: Book = {} as Book;

  /**
   * A nyelvek neveinek és kódjainak összerendelését tartalmazó objektum
   */
  languageNames = languageNames;

  ngOnInit(): void {
    // Az URL paraméterből kiolvassuk az 'id' értékét
    let getParamId = this.route.snapshot.paramMap.get('id');
    console.log(getParamId, 'getParamId#');
    // Lekérdezzük a könyv részleteit az azonosító alapján
    this.getBook(getParamId);
  }
  /**
    * Lekérdezi a könyv részleteit az azonosító alapján és beállítja a 'book' változót.
    *
    * @param key - A könyv azonosítója
    */
  getBook(key: any) {
    this.service.getBookById(key).subscribe((result) => {
      console.log(result, 'getbookdetails#');
      this.book = result;
      this.book.header = this.dataservice.getData('bookheader');
    })
  }
  /**
   * Visszaadja a könyvleírás értékét, az api inkonzisztenciát kezeli
   *
   * @param description - A leírás, lehet string vagy objektum
   * @returns A leírás értéke vagy undefined, ha nem érhető el
   */
  getDescriptionValue(description: string | { type?: string; value?: string }): string | undefined {
    if (typeof description === 'string') {
      return description;
    } else if (description && description.value) {
      return description.value;
    }
    return undefined;
  }
  /**
    * Az íróra kattintáskor az író részleteinek megjelenítése új komponensben
    *
    * @param author - Az író indexe a szerzők tömbben
    */
  authorClick(author: number) {
    let author_key = this.book.header?.author_key?.at(author);
    this.router.navigate(['author', author_key]);
  }
  /**
     * Megnyitja a képnéző dialógusablakot a megadott kép forrásával.
     *
     * @param imageSrc - A kép forrása
     */
  openImageModal(imageSrc: string): void {
    this.dialog.open(ImagemodalComponent, {
      data: { imageSrc },
    });
  }
}
