import { Component, OnDestroy, OnInit, effect, inject, input } from '@angular/core';
import { PlantesItem } from '../plantes-item/plantes-item';
import { Iplanta } from '../iplanta';
import { Supaservice } from '../../services/supaservice';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-plantes-list',
  imports: [PlantesItem],
  templateUrl: './plantes-list.html',
  styleUrl: './plantes-list.css',
})

export class PlantesList implements OnInit, OnDestroy{
  private supaservice: Supaservice = inject(Supaservice);

  // plantes = toSignal<Iplanta[]>(this.supaservice.plantesSubject);
  plantes = toSignal(this.supaservice.plantesSubject);

  search = input('');

  constructor() {
    effect(() => {
      console.log("Search: ", this.search());
      this.supaservice.setSearchString(this.search());
    })
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    //this.plantesSuscription?.unsubscribe();
  }

  toggleFavorite(planta: Iplanta) {
    planta.favorite = !planta.favorite;
  }
}
