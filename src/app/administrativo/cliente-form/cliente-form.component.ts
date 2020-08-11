import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { utilsBr } from 'js-brasil';
import { CepService } from 'src/app/core/services/cep.service';
import { StringUtils } from 'src/app/shared/utils/string-utils';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/shared/entity/Cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private clienteService: ClienteService,
    private router: ActivatedRoute,
    private route: Router,
    private toaster: NotificationService
  ) { }

  clienteForm: FormGroup;
  cliente: Cliente;
  idCliente: any;
  titulo: string;
  MASKS = utilsBr.MASKS;

  ngOnInit() {

    this.idCliente = this.router.snapshot.paramMap.get('id');
    this.getTituloDinamico();

    this.clienteForm = this.fb.group({
      id: [''],
      tipoCliente: ['0', Validators.required],
      nome: [''],
      rg: [''],
      razaoSocial: [''],
      cnpj: [''],
      email: ['', [Validators.required, Validators.email]],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        logradouro: ['', Validators.required],
        bairro: ['', Validators.required],
        numero: ['', Validators.required],
        localidade: ['', Validators.required],
        uf: ['SP', Validators.required],
        complemento: [''],
      }),
      telefones: this.fb.array([])
    });

    this.preencherCliente();

  }

  preencherCliente() {
    if (!this.idCliente) {
      (this.clienteForm.get('telefones') as FormArray).push(this.createTelefone());
    } else {
      this.getBuscarCliente();
    }
  }

  // Transforma o Telefone em um FormArray
  get telefones() {
    return (this.clienteForm.get('telefones') as FormArray).controls;
  }

  get isPessoaFisica() {
    return this.clienteForm.get('tipoCliente').value === '0';
  }

  get isPessoaJuridica() {
    return this.clienteForm.get('tipoCliente').value === '1';
  }

  // Salva o Cliente
  salvar() {
    const cliente = this.clienteForm.value;


    if (this.idCliente) {
      this.clienteService.update(cliente).subscribe({
        next: clienteEditar => {
          this.toaster.showSuccess('Cliente alterado com sucesso', 'Sucesso');
          this.route.navigate(['/administrativo/clientes']);
        },
        error: error => {console.log(error); }
      });
    } else {
      this.clienteService.create(cliente).subscribe({
        next: clienteSalvar => {
          this.toaster.showSuccess('Cliente cadastrado com sucesso', 'Sucesso');
          this.route.navigate(['/administrativo/clientes']);
        },
        error: error => {console.log(error); }
      });
    }
  }

  getTituloDinamico() {
    if (this.idCliente) {
      this.titulo = 'Editar';
    } else {
      this.titulo = 'Novo';
    }
  }

  getBuscarCliente() {
    if (this.idCliente) {
      this.clienteService.getClienteById(this.idCliente).subscribe({
        next: cliente => {
          this.clienteForm.patchValue(cliente);
          const telefones = this.clienteForm.get('telefones') as FormArray;
          cliente.telefones.forEach(t => {
            telefones.push(this.fb.group({
              ddd: t.ddd,
              numero: t.numero
            }));
          });
        },
        error: error => {console.log(error); }
      });
    }
  }

  // Buscar CEP no site ViaCEP dos correios
  getBuscarCep(cep: string) {
    cep = StringUtils.apenasNumeros(cep);

    if (cep.length < 8) {
      return;
    }

    this.cepService.getCep(cep).subscribe({
      next: endereco => {
        this.clienteForm.get('endereco').patchValue(endereco);
        this.clienteForm.get('endereco').get('complemento').reset();
      },
      error: error => {console.log(error); }
    });
  }

  // Adiciona mais Itens de Telefone
  adicionarTelefone() {
    const telefones = this.clienteForm.get('telefones') as FormArray;
    telefones.push(this.createTelefone());
  }

  // Remove Itens de Telefone
  removerTelefone(telefoneIndex: number) {
    const telefones = this.clienteForm.get('telefones') as FormArray;
    telefones.removeAt(telefoneIndex);
  }

  // Cria os campos do Telefone
  createTelefone() {
    return this.fb.group({
      ddd: ['', Validators.required],
      numero: ['', Validators.required]
    });
  }

  voltar() {
    this.route.navigate(['/administrativo/clientes']);
  }

}
