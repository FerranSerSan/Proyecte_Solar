import { Component, input } from '@angular/core';
import { Iplanta } from '../iplanta';

@Component({
  selector: '[app-plantes-tables-row]',
  imports: [],
  templateUrl: './plantes-tables-row.html',
  styleUrl: './plantes-tables-row.css',
})
export class PlantesTablesRow {

  // planta!: Iplanta;
  planta = input.required<Iplanta>({alias: 'plantaAlias'});
}
