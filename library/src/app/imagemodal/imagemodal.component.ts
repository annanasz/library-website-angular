import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * Az ImagemodalComponent komponens, amely egy képnézegető párbeszédablakot reprezentál
 */
@Component({
  selector: 'app-imagemodal',
  templateUrl: './imagemodal.component.html',
  styleUrls: ['./imagemodal.component.scss']
})
export class ImagemodalComponent {
  /**
  * Az injektált adat, amely tartalmazza a megjelenítendő kép forrását
  */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageSrc: string }) {
    console.log(data);
  }
}
