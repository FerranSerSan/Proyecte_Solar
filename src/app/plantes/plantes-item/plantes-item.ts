import { Component, input, output } from '@angular/core';
import { Iplanta } from '../iplanta';

@Component({
  selector: 'app-plantes-item',
  imports: [],
  templateUrl: './plantes-item.html',
  styleUrl: './plantes-item.css',
})
export class PlantesItem {
  planta = input.required<Iplanta>({alias: 'plantaAlias'});

  favoriteToggled = output<void>();

  toggleFavorite() {
    this.favoriteToggled.emit();
  }
}
