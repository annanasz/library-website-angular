import { Injectable, EventEmitter } from '@angular/core';
/**
 * Az InternetConnectivityService egy Injectable szolgáltatás, amely az internetkapcsolat állapotának
 * figyeléséért és változásának jelzéséért felelős
 */
@Injectable({
  providedIn: 'root'
})
export class InternetConnectivityService {
  // Létrehoz egy EventEmitter-t az online állapot változásának jelzésére
  private onlineStatusChanged: EventEmitter<boolean>;

  constructor() {
    this.onlineStatusChanged = new EventEmitter<boolean>();
    // Ellenőrzi az internetkapcsolatot az inicializáláskor
    this.checkInternetConnection();
  }

  private checkInternetConnection() {
    const isOnline = navigator.onLine;
    // Eseménykezelők hozzáadása az online és offline eseményekhez
    window.addEventListener('online', () => {
      this.onlineStatusChanged.emit(true);
    });
    // Amikor az offline esemény bekövetkezik, jelzi az állapotváltozást az EventEmitter segítségével
    window.addEventListener('offline', () => {
      this.onlineStatusChanged.emit(false);
    });

    // Kezdeti kapcsolatállapot jelzése
    this.onlineStatusChanged.emit(isOnline);
  }
  /**
   * Visszaadja az online állapot változására emittált EventEmitter-t
   * @returns Az online állapot változására emittált EventEmitter
   */
  getOnlineStatusChanged(): EventEmitter<boolean> {
    return this.onlineStatusChanged;
  }
}