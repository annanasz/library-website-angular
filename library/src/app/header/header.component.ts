import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**
 * A HeaderComponent komponens, amely a fejlécet kezeli és megjeleníti
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  /**
   * A Router példány, amely a navigációt szolgáltatja
   */
constructor(private router: Router){ }

ngOnInit(): void {
}
 /**
   * Átirányítja az alkalmazást a kezdőlapra ('home' útvonalra).
   */
goToHome() {
  this.router.navigate(['home']);
}

}
