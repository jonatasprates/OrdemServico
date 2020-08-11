import { Tecnico } from './../../shared/entity/Tecnico';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { TecnicoService } from 'src/app/core/services/tecnico.service';
import { NgBrDirectives } from 'ng-brazil';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

@Component({
  selector: 'app-equipe-tecnico-list',
  templateUrl: './equipe-tecnico-list.component.html',
  styleUrls: ['./equipe-tecnico-list.component.css']
})
export class EquipeTecnicoListComponent implements OnInit {

  tecnicos: Tecnico[] = [];
  tecnicoFiltrado: Tecnico[] = [];
  modalRef: BsModalRef;
  idParaSerExcluido: number;

  constructor(
    private tecnicoService: TecnicoService,
    private modalService: BsModalService,
    private toaster: NotificationService
  ) { }

  ngOnInit() {
    this.getTecnicos();
  }

getTecnicos() {
  this.tecnicoService.getTecnicos().subscribe({
    next: tecnicos => {
      this.tecnicos = tecnicos;
      this.tecnicoFiltrado = tecnicos;
    },
    error: error => { console.log(error); }
  });
}

// Recupe a lista de Telefones do Cliente para exibir na tela concatenando ddd junto ao número
getTelefones(tecnico: Tecnico) {
  const {TelefonePipe} = NgBrDirectives;
  const telefonePipe = new TelefonePipe();
  return tecnico.telefones.map(telefone => telefonePipe.transform(telefone.ddd + telefone.numero));
}

// Abre a Janela Modal
openModal(template: TemplateRef<any>, id: number) {
  this.idParaSerExcluido = id;
  this.modalRef = this.modalService.show(template);
}

// Fecha a Janela Modal
sairModalConfirmacaoDeletar() {
  this.modalRef.hide();
}

// Delete o Tecnico através do id
deletar() {
  this.tecnicoService.delete(this.idParaSerExcluido).subscribe({
    next: tecnico => {
      this.getTecnicos();
      this.toaster.showSuccess('Técnico excluído com sucesso.', 'Exclusão');
      this.sairModalConfirmacaoDeletar();
    },
    error: error => {
      this.toaster.showError('Erro ao excluir o técnico. Favor contante o administrador', 'Exclusão');
    }
  });
}

filtrarTecnicos(filtro: string) {
  if (!filtro.trim()) {
    this.tecnicoFiltrado = this.tecnicos;
    return;
  }
  filtro = filtro.toLowerCase();
  this.tecnicoFiltrado = this.tecnicos
    .filter(tecnico =>
      tecnico.nome.toLowerCase().includes(filtro) ||
      tecnico.status.toLowerCase().includes(filtro) ||
      tecnico.email.toLowerCase().includes(filtro) ||
      tecnico.telefones.find(telefone => telefone.ddd.includes(filtro)) ||
      tecnico.telefones.find(telefone => telefone.numero.includes(filtro))
    );
}

}
