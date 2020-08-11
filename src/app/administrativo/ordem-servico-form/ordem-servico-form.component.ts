import { Router } from '@angular/router';
import { OrdemServico } from 'src/app/shared/entity/OrdemServico';
import { Cliente } from './../../shared/entity/Cliente';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { OrdemServicoService } from 'src/app/core/services/ordem-servico.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ItemOrdemServico } from 'src/app/shared/entity/ItemOrdemServico';

@Component({
  selector: 'app-ordem-servico-form',
  templateUrl: './ordem-servico-form.component.html',
  styleUrls: ['./ordem-servico-form.component.css']
})
export class OrdemServicoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  ordemServicoForm: FormGroup;
  ordemServico: OrdemServico;

  constructor(
    private fb: FormBuilder,
    private ordemServicoService: OrdemServicoService,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {

    this.ordemServicoForm = this.fb.group({
      clienteId: [''],
      usuarioId: [''],
      statusServico: [''],
      observacao: [''],
      itensOrdemServico: this.fb.array([])
    });

    this.preencherItensOrdemServico();

  }

  buscarCliente(event: any) {
    const nomeCliente = event.target.value;
    this.clienteService.searchNome(nomeCliente).subscribe({
      next: clienteLista => {
        this.clientes = clienteLista;
        const listaClientes = this.clientes.filter(x => x.nome === nomeCliente)[0];
      }
    });
  }

  preencherItensOrdemServico() {
    (this.ordemServicoForm.get('itensOrdemServico') as FormArray).push(this.createItemOrdem());
  }

  get itensOrdemServico() {
    return (this.ordemServicoForm.get('itensOrdemServico') as FormArray).controls;
  }

  createItemOrdem() {
    return this.fb.group({
      descricao: [''],
      quantidade: [''],
      tipoServico: [''],
      valorUnitario: [''],
      valorTotal: [''],
    });
  }

  adicionarItemOrdem() {
    const itensOrdemServico = this.ordemServicoForm.get('itensOrdemServico') as FormArray;
    itensOrdemServico.push(this.createItemOrdem());
  }

   removerItemOrdem(ItemIndex: number) {
    const itensOrdemServico = this.ordemServicoForm.get('itensOrdemServico') as FormArray;
    itensOrdemServico.removeAt(ItemIndex);
  }

  getTotal(): number {
    let total = 0;
    this.ordemServico.itensOrdemServico.forEach(item => {
      total += item.quantidade * item.valorUnitario;
    });
    return total;
  }

  voltar() {
    this.router.navigate(['/administrativo/ordens-servicos']);
  }

}
