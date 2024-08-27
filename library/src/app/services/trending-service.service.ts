import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Az OpenLibraryService egy Injectable szolgáltatás, amely az Open Library API-val kommunikál
 */
export class OpenLibraryService {
  constructor(private httpclient: HttpClient) { }

  baseurl = 'https://openlibrary.org';

  /**
   * Lekéri a hetenti népszerű könyveket az Open Library API-ról
   * @returns  Observable, amely a népszerű könyveket tartalmazza
   */
  getTrendingBooks(): Observable<any> {
    return this.httpclient.get(`${this.baseurl}/trending/weekly.json`);
  }
  /**
    * Lekéri a könyveket a megadott keresési kritérium és keresési paraméter alapján az Open Library API-ról
    * @param query A keresési paraméter
    * @param querystring A keresési kritérium
    * @returns Az Observable, amely a keresett könyveket tartalmazza
    */
  getBookSearch(query: string | null, querystring: string): Observable<any> {
    return this.httpclient.get(`${this.baseurl}/search.json?${querystring}=${query}`);
  }
  /**
  * Lekéri a könyvet a megadott azonosító alapján az Open Library API-ról
  * @param key A könyv azonosítója
  * @returns Az Observable, amely a könyv részleteit tartalmazza
  */
  getBookById(key: string): Observable<any> {
    return this.httpclient.get(`${this.baseurl}${key}.json`);
  }
  /**
     * Lekéri az írót a megadott azonosító alapján az Open Library API-ról
     * @param key Az író azonosítója
     * @returns Az Observable, amely az író részleteit tartalmazza
     */
  getAuthorById(key: string): Observable<any> {
    return this.httpclient.get(`${this.baseurl}/authors/${key}.json`);
  }
}
