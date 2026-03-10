import { Component, inject, signal } from '@angular/core';
import { Iplanta } from '../iplanta';
// import { PLANTES_DEMO } from '../plantes_demo';
import { PlantesTablesRow } from '../plantes-tables-row/plantes-tables-row';
import { Supaservice } from '../../services/supaservice';
import { Subscription } from 'rxjs';
import { isAuthApiError } from '@supabase/supabase-js';

@Component({
  selector: 'app-plantes-tables',
  imports: [PlantesTablesRow],
  templateUrl: './plantes-tables.html',
  styleUrl: './plantes-tables.css',
})

export class PlantesTables {
  //plantes = signal< Iplanta[]>(PLANTES_DEMO);
  private supaservice: Supaservice = inject(Supaservice);

  public plantes = signal<Iplanta[]>([]);
  plantesSuscription?: Subscription;

  ngOnInit(): void {
    /*this.plantesSuscription = this.supaservice.getIplantes().subscribe(
      (plantesSupabase: Iplanta[]) => {
        this.plantes.set(plantesSupabase);
      }
    ); */
    this.supaservice.getPlantesSupabase().then((p: Iplanta[]) => {this.plantes.set(p);
    });
  }
}
