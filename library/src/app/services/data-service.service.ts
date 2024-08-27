import { Injectable } from '@angular/core';

/**
 * A DataServiceService egy Injectable szolgáltatás, amely adatok tárolásáért és lekérdezéséért felelős
 */
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private storageKeyBookheader = "bookheader";
  private storageKeyHistory = "search";
  constructor() { }
  /**
   * Adat mentése a böngésző helyi tárolójába a megadott kritérium alapján
   * @param data A mentendő adat
   * @param criteria Az adat mentésének kritériuma
   */
  setData(data: any, criteria: string) {
    if (criteria == 'bookheader') //ha bookheader-t mentünk el, akkor azt a kulcsot használjuk a mentséhez
      localStorage.setItem(this.storageKeyBookheader, JSON.stringify(data));
    else
      localStorage.setItem(this.storageKeyHistory, JSON.stringify(data));//ellenkező esetben keresési előzményt mentünk
  }
  /**
   * Adat lekérése a böngésző helyi tárolójából a megadott kritérium alapján
   * @param criteria Az adat lekérdezésének kritériuma
   * @returns A tárolt adat, ha létezik, különben null
   */
  getData(criteria: string) {
    let storedData = localStorage.getItem(this.storageKeyHistory);
    if (criteria == 'bookheader')//ha bookheadert kérdezünk le, akkor a megfelelő kulcsot kell használnunk
      storedData = localStorage.getItem(this.storageKeyBookheader);

    if (storedData) {
      return JSON.parse(storedData);
    }

    return null;
  }
}
