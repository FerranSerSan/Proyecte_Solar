import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { PlantesTables } from './plantes/plantes-tables/plantes-tables';
import { PlantesList } from "./plantes/plantes-list/plantes-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, PlantesTables, PlantesList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecte_Solar');
}
