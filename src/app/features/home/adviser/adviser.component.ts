import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {SearchByBarcodeComponent} from "../../shop/shared/components/search-by-barcode.component";

@Component({
    standalone: true,
    imports: [MatGridList, MatGridTile, SearchByBarcodeComponent],
    templateUrl: 'adviser.component.html',
    styleUrls: ['adviser.component.css'],
})
export class AdviserComponent {
}
