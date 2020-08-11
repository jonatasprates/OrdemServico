import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgBrDirectives } from 'ng-brazil';
import { Cliente } from 'src/app/shared/entity/Cliente';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  modalRef: BsModalRef;
  idParaSerExcluido: number;

  constructor(
    private clienteService: ClienteService,
    private modalService: BsModalService,
    private toaster: NotificationService
    ) { }

  ngOnInit() {
    this.getClientes();
  }

  // Busca todos os clientes para exibir na grid
  getClientes() {
    this.clienteService.getClientes().subscribe({
      next: clientes => {
        this.clientes = clientes;
        this.clientesFiltrados = clientes;
      },
      error: error => {console.log(error); }
    });
  }

  // Recupe a lista de Telefones do Cliente para exibir na tela concatenando ddd junto ao número
  getTelefones(cliente: Cliente) {
    const {TelefonePipe} = NgBrDirectives;
    const telefonePipe = new TelefonePipe();
    return cliente.telefones.map(telefone => telefonePipe.transform(telefone.ddd + telefone.numero));
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
    this.clienteService.delete(this.idParaSerExcluido).subscribe({
      next: cliente => {
        this.getClientes();
        this.toaster.showSuccess('Cliente excluído com sucesso.', 'Exclusão');
        this.sairModalConfirmacaoDeletar();
      },
      error: error => {
        this.toaster.showError('Erro ao excluir o cliente. Favor contante o administrador', 'Exclusão');
      }
    });
  }

  filtrarClientes(filtro: string) {
    if (!filtro.trim()) {
      this.clientesFiltrados = this.clientes;
      return;
    }
    filtro = filtro.toLowerCase();
    this.clientesFiltrados = this.clientes
      .filter(cliente =>
        cliente.nome.toLowerCase().includes(filtro) ||
        cliente.razaoSocial.toLowerCase().includes(filtro) ||
        cliente.email.toLowerCase().includes(filtro) ||
        cliente.telefones.find(telefone => telefone.numero.includes(filtro))
      );
  }

}
