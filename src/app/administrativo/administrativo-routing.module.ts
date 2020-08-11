import { OrdemServicoResolver } from './../core/services/resolvers/ordem-servico.resolve';
import { OrdemServicoDetalheComponent } from './ordem-servico-detalhe/ordem-servico-detalhe.component';
import { OrdemServicoFormComponent } from './ordem-servico-form/ordem-servico-form.component';
import { OrdemServicoListComponent } from './ordem-servico-list/ordem-servico-list.component';
import { EquipeTecnicoFormComponent } from './equipe-tecnico-form/equipe-tecnico-form.component';
import { EquipeTecnicoListComponent } from './equipe-tecnico-list/equipe-tecnico-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const administrativoRoutes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
        { path: '', component: HomeComponent},
        { path: 'clientes', component: ClienteListComponent},
        { path: 'cliente/add', component: ClienteFormComponent},
        { path: 'cliente/:id/edit', component: ClienteFormComponent},

        { path: 'tecnicos', component: EquipeTecnicoListComponent},
        { path: 'tecnico/add', component: EquipeTecnicoFormComponent},
        { path: 'tecnico/:id/edit', component: EquipeTecnicoFormComponent},

        { path: 'ordens-servicos', component: OrdemServicoListComponent},
        { path: 'ordens-servicos/add', component: OrdemServicoFormComponent},
        { path: 'ordens-servicos/:id/edit', component: OrdemServicoFormComponent},
        {
          path: 'ordens-servicos/:id/visualizar',
          component: OrdemServicoDetalheComponent,
          resolve: {
            ordemServico: OrdemServicoResolver
          }
        }
  ]},

  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forChild(administrativoRoutes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
