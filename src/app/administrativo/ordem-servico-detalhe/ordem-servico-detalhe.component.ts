import { ItemOrdemServico } from './../../shared/entity/ItemOrdemServico';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgBrDirectives } from 'ng-brazil';
import { OrdemServico } from './../../shared/entity/OrdemServico';

@Component({
  selector: 'app-ordem-servico-detalhe',
  templateUrl: './ordem-servico-detalhe.component.html',
  styleUrls: ['./ordem-servico-detalhe.component.css']
})
export class OrdemServicoDetalheComponent implements OnInit {

  ordemServicoForm: FormGroup;
  ordemServico: OrdemServico;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.ordemServico = this.route.snapshot.data.ordemServico;

    this.ordemServicoForm = this.fb.group({
      itensOrdemServico: this.fb.array([]),
      cliente: this.fb.group({
        nome: [''],
        razaoSocial: [''],
        email: [''],
        telefones: this.fb.array([])
      }),
      statusServico: [''],
      observacao: ['']
    });

    this.ordemServicoForm.patchValue(this.ordemServico);
    this.preencherTelefones();
    this.preencherItensOrdemServico();
  }

  preencherTelefones() {
    const {TelefonePipe} = NgBrDirectives;
    const telefonePipe = new TelefonePipe();
    const telefones = this.ordemServicoForm.get('cliente').get('telefones') as FormArray;

    this.ordemServico.cliente.telefones.forEach(telefone => {
      telefones.push(this.fb.group({
        id: [telefone.id],
        ddd: [telefone.ddd],
        numero: [telefone.numero],
        telefoneFormatado: [telefonePipe.transform(telefone.ddd + telefone.numero)]
      }));
    });
  }

  preencherItensOrdemServico() {
    const itensOrdemServico = this.ordemServicoForm.get('itensOrdemServico') as FormArray;

    this.ordemServico.itensOrdemServico.forEach(item => {
      itensOrdemServico.push(this.fb.group({
        id: [item.id],
        descricao: [item.descricao],
        quantidade: [item.quantidade],
        tipoServico: [item.tipoServico],
        valorUnitario: [item.valorUnitario],
        valorTotal: [this.calcularValorTotal(item)]
      }));
    });
  }

  // Transforma o Telefone em um FormArray
  get telefones() {
    return (this.ordemServicoForm.get('cliente').get('telefones') as FormArray).controls;
  }

  get itensOrdemServico() {
    return (this.ordemServicoForm.get('itensOrdemServico') as FormArray).controls;
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

  private calcularValorTotal(item: ItemOrdemServico): number {
    return item.quantidade * item.valorUnitario;
  }

}
