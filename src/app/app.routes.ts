import { Routes } from '@angular/router';
import { PlantesList } from './plantes/plantes-list/plantes-list';
import { Home } from './components/home/home';
import { PlantesTables } from './plantes/plantes-tables/plantes-tables';
import { PlantesDetail } from './plantes/plantes-detail/plantes-detail';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { userGuard } from './guards/user-guard-guard';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'plantes', canActivate: [userGuard], component: PlantesList},
    {path: 'plantes/:search', component: PlantesList},
    {path: 'plantesTables', component: PlantesTables},
    {path: 'planta/:id', component: PlantesDetail},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
];
