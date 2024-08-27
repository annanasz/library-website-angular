import { Component, OnInit } from '@angular/core';
import { OpenLibraryService } from '../services/trending-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { Header } from '../models/header.type';
import { InternetConnectivityService } from '../services/internet-connectivity.service';
import { Subscription } from 'rxjs';
OpenLibraryService
/**
 * Enum, amely tartalmazza a lehetséges keresési kritériumokat
 */
enum SearchCategory {
  Subject = 'Subject',
  Title = 'Title',
  General = 'General',
  Author = 'Author'
}
/**
 * Az HomeComponent komponens, amely kezeli a kezdőlapot és annak nézetét
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * OpenLibraryService példány, amely a könyv adatok lekérdezését szolgáltatja
   * A Router példány, amely a navigációt szolgáltatja
   * DataService segítségével biztosítunk paramétereket a book komponensnek
   * ActivatedRoute segítségével lekérdezhetjük az q és c értéket az url-ből
   * InternetConnectivityService segít ellenőrizni, hogy van-e internetkapcsolat
   */
  constructor(
    private service: OpenLibraryService,
    private router: Router,
    private dataservice: DataServiceService,
    private route: ActivatedRoute,
    private internetconnectivity: InternetConnectivityService
  ) { }
  /**
   * A keresési kategóriák felsorolása
   */
  searchCategories: SearchCategory[] = [
    SearchCategory.General,
    SearchCategory.Title,
    SearchCategory.Author,
    SearchCategory.Subject
  ];
  /**
  * A keresési előzményeket tartalmazó tömb
  */
  history: string[] = [];
  /**
   * A könyvfejléceket tartalmazó tömb
   */
  bookheaders: Header[] = [];
  /**
   * A keresési szöveg
   */
  searchText: string = "";
  /**
   * A kiválasztott keresési kategória
   */
  selectedCategory: SearchCategory = SearchCategory.General;
  /**
   * Betöltés állapotát jelző flag
   */
  loading: boolean = true;
  /**
   * Szöveg az aktuális nézeten
   */
  text: string = "Trending: ";
  /**
 * Keresés állapotát jelző flag
 */
  search: boolean = false;
  /**
  * Hálózati állapotot jelző flag
  */
  networkStatus: boolean = navigator.onLine;
  /**
   * Feliratkozás a hálózati állapot változására
   */
  networkStatus$: Subscription = Subscription.EMPTY;

  ngOnInit(): void {
    // Feliratkozás a hálózati állapot változására
    this.internetconnectivity
      .getOnlineStatusChanged()
      .subscribe((isOnline: boolean) => {
        this.networkStatus = isOnline;
      });
    // Ha van internetkapcsolat
    if (this.networkStatus) {
      let params = this.router.url;
      // Ha a paraméter "/home lekérjük a népszerű könyveket"
      if (params == "/home")
        this.trendingBooks();
      else {
        //ha nem /home, akkor azt jelenti hogy egy meglévő keresésre léptünk vissza, úgyhogy visszatöltjük az adatokat
        this.route.queryParams.subscribe(params => {
          const searchQuery = params['q'];
          const searchCategory = params['c'];
          this.searchText = searchQuery; //a keresési szöveg visszaállítása
          console.log(searchCategory, searchQuery);
          //keresési kategória visszaállítása
          switch (searchCategory) {
            case "q":
              this.selectedCategory = SearchCategory.General;
              break;
            case "author":
              this.selectedCategory = SearchCategory.Author;
              break;
            case "subject":
              this.selectedCategory = SearchCategory.Subject;
              break;
            case "title":
              this.selectedCategory = SearchCategory.Title;
              break;
          }
          //keresés elvégzése
          this.getSearchedItems(searchCategory);
        })
      }
      let history = this.dataservice.getData('search');
    }
  }
  /**
    * Az aktuális népszerű könyvek lekérése
    */
  trendingBooks() {
    if (this.networkStatus)
      this.service.getTrendingBooks().subscribe((result) => {
        console.log(result, "trendingBooksResult#");
        this.bookheaders = result.works;
        this.loading = false;
      });
  }

  /**
   * Könyvfejlécre kattintás eseménykezelő, navigálunk a köyvet részletesen bemuató oldalra
   */
  itemClicked(bookheader: Header) {
    if (this.networkStatus) {
      this.dataservice.setData(bookheader, 'bookheader');//elmentjük a kattinntott fejlécet, hogy majd a book komponensben tudjuk használni
      this.router.navigate(['book', bookheader.key]);
    }
  }
  /**
     * Keresett elemek lekérése api hívással a szolgáltatás segítségével
     */
  getSearchedItems(querystring: string) {
    this.service.getBookSearch(this.searchText, querystring).subscribe((result) => {
      console.log(result, 'searchbook##');
      this.bookheaders = result.docs;
      this.text = "Search results: ";
      this.loading = false;
    });
  }
  /**
   * Keresés indítása gombnyomásra, attól függően, hogy milyen kategória van beálítva
   */
  submitSearch() {
    if (this.networkStatus) {
      this.loading = true;
      console.log(this.searchText, 'searchform#');
      let querystring = "";
      switch (this.selectedCategory) {
        case SearchCategory.General:
          querystring = "q";
          break;
        case SearchCategory.Author:
          querystring = "author";
          break;
        case SearchCategory.Subject:
          querystring = "subject";
          break;
        case SearchCategory.Title:
          querystring = "title";
          break;
      }
      this.history.push(this.searchText); //a keresés elmentése
      this.dataservice.setData(this.history, 'search');
      this.router.navigate(['search'], { queryParams: { q: this.searchText, c: querystring } });
    }
  }
  /**
     * Korábbi keresési kifejezés betöltése
     */
  loadSearchTerm(term: string) {
    this.searchText = term;
    this.submitSearch();
  }
  /**
     * Képhiba eseménykezelő, ha az api nem biztosít képet, akkor lokálisan töltünk be egyet
     */
  handleImageError($event: ErrorEvent) {
    const imgElement = event?.target as HTMLImageElement;
    imgElement.src = "assets/no_cover.jpg";
  }

}
