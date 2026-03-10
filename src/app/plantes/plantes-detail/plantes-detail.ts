import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Supaservice } from '../../services/supaservice';
import { JsonPipe } from '@angular/common';
import { Iplanta } from '../iplanta';

@Component({
  selector: 'app-plantes-detail',
  imports: [JsonPipe],
  templateUrl: './plantes-detail.html',
  styleUrl: './plantes-detail.css',
})

export class PlantesDetail implements OnInit {
  private supaservice: Supaservice = inject(Supaservice);

  public planta = signal<Iplanta>({} as Iplanta);

  id = input<string>();

  ngOnInit() {
    this.supaservice.getIplantesById(Number(this.id())).then((p: Iplanta) => {
      this.planta.set(p);
    });
  }

}
