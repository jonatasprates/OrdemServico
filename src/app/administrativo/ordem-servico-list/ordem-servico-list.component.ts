import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgBrDirectives } from 'ng-brazil';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrdemServicoService } from 'src/app/core/services/ordem-servico.service';
import { Telefone } from 'src/app/shared/entity/Telefone';
import { OrdemServico } from 'src/app/shared/entity/OrdemServico';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

@Component({
  selector: 'app-ordem-servico-list',
  templateUrl: './ordem-servico-list.component.html',
  styleUrls: ['./ordem-servico-list.component.css']
})
export class OrdemServicoListComponent implements OnInit {

  ordemServicos: OrdemServico[] = [];
  modalRef: BsModalRef;
  idParaSerExcluido: number;

  constructor(
    private ordemServicoService: OrdemServicoService,
    private modalService: BsModalService,
    private toaster: NotificationService
  ) { }

  ngOnInit() {
    this.getOrdemServico();
  }

  getOrdemServico() {
    this.ordemServicoService.getOrdemServicos().subscribe({
      next: ordemServico => {
        this.ordemServicos = ordemServico;
      },
      error: error => {console.log(error); }
    });
  }

  getTipoServico(ordemServico: OrdemServico) {
    return ordemServico.itensOrdemServico.map(item => item.tipoServico);
  }

  getTotal(ordemServico: OrdemServico) {
    let total = 0;
    ordemServico.itensOrdemServico.forEach(item => {
      total += item.quantidade * item.valorUnitario;
    });
    return total;
  }

  getTelefonesCliente(telefones: Telefone[]) {
    const {TelefonePipe} = NgBrDirectives;
    const telefonePipe = new TelefonePipe();
    return telefones.map(telefone => telefonePipe.transform(telefone.ddd + telefone.numero));
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

  // Delete o Cliente através do id
  deletar() {
    this.ordemServicoService.delete(this.idParaSerExcluido).subscribe({
      next: ordemServico => {
        this.getOrdemServico();
        this.toaster.showSuccess('Ordem de Serviço excluída com sucesso.', 'Exclusão');
        this.sairModalConfirmacaoDeletar();
      },
      error: error => {
        this.toaster.showError('Erro ao excluir a Ordem de Serviço. Favor contante o administrador', 'Exclusão');
      }
    });
  }

}
