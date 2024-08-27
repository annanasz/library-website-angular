import { Component, OnInit } from '@angular/core';
import { OpenLibraryService } from '../services/trending-service.service';
import { Author } from '../models/author.type';
import { ActivatedRoute } from '@angular/router';

/**
 * Az AuthorComponent komponens, amely kezeli az írók adatait és nézetét
 */
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  /**
  * OpenLibraryService példány, amely az író adatok lekérdezését szolgáltatja api-n keresztül
  */
  constructor(private service: OpenLibraryService, private route: ActivatedRoute) { }

  /**
 * Az aktuális író adatait tartalmazó objektum
 */
  author: Author = {} as Author;

  /**
  * Inicializálja a komponenst.
  * Az URL paraméterből kiolvassa az 'id' értékét,
  * majd lekéri az író adatait az azonosító alapján.
  */
  ngOnInit(): void {
    let getParamId = this.route.snapshot.paramMap.get('id');
    this.getAuthor(getParamId);
  }
  /**
   * Lekérdezi az író adatait az azonosító alapján és beállítja a 'author' változót.
   *
   * @param id - Az író azonosítója
   */
  getAuthor(id: any) {
    this.service.getAuthorById(id).subscribe((result) => {
      console.log(result, 'getauthor#');
      this.author = result;
      this.author.key = this.author.key?.split('/').pop();
    })
  }
  /**
  * Visszaadja az író biográfiáját, az api inkonzisztenciáját hivatott kezelni
  *
  * @param bio - Az író biográfiaja, lehet string vagy objektum
  * @returns Az író biográfiáját tartalmazó string vagy undefined, ha nem érhető el
  */
  getBioValue(bio: string | { type?: string; value?: string }): string | undefined {
    if (typeof bio === 'string') {
      return bio;
    } else if (bio && bio.value) {
      return bio.value;
    }
    return undefined;
  }

}
