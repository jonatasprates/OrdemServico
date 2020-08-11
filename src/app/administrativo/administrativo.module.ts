import { NumeroOsPipe } from './../shared/pipes/numero-os.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from './../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { EquipeTecnicoListComponent } from './equipe-tecnico-list/equipe-tecnico-list.component';
import { EquipeTecnicoFormComponent } from './equipe-tecnico-form/equipe-tecnico-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { OrdemServicoFormComponent } from './ordem-servico-form/ordem-servico-form.component';
import { OrdemServicoListComponent } from './ordem-servico-list/ordem-servico-list.component';
import { HomeComponent } from './home/home.component';
import { AdministrativoRoutingModule } from './administrativo-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClienteService } from '../core/services/cliente.service';
import { CepService } from '../core/services/cep.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { TecnicoService } from '../core/services/tecnico.service';
import { OrdemServicoDetalheComponent } from './ordem-servico-detalhe/ordem-servico-detalhe.component';
import { OrdemServicoService } from '../core/services/ordem-servico.service';
import { OrdemServicoResolver } from '../core/services/resolvers/ordem-servico.resolve';

@NgModule({
  declarations: [
    ClienteFormComponent,
    ClienteListComponent,
    EquipeTecnicoFormComponent,
    EquipeTecnicoListComponent,
    UsuarioFormComponent,
    UsuarioListComponent,
    OrdemServicoFormComponent,
    OrdemServicoListComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    OrdemServicoDetalheComponent,
    NumeroOsPipe
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    CoreModule,
    AdministrativoRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    TextMaskModule,
    NgBrazil
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    ClienteService,
    CepService,
    TecnicoService,
    OrdemServicoService,
    OrdemServicoResolver
  ]
})
export class AdministrativoModule { }
