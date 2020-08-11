import { TecnicoService } from 'src/app/core/services/tecnico.service';
import { Status } from './../../shared/enum/Status';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Tecnico } from 'src/app/shared/entity/Tecnico';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipe-tecnico-form',
  templateUrl: './equipe-tecnico-form.component.html',
  styleUrls: ['./equipe-tecnico-form.component.css']
})
export class EquipeTecnicoFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private tecnicoService: TecnicoService,
    private router: ActivatedRoute,
    private route: Router,
    private toaster: NotificationService
  ) { }

  tecnicoForm: FormGroup;
  tecnico: Tecnico;
  tecnicoId: any;
  titulo: string;

  ngOnInit() {

    this.tecnicoId = this.router.snapshot.paramMap.get('id');
    this.getTituloDinamico();

    this.tecnicoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: [Status.habilitado, Validators.required],
      telefones: this.fb.array([])
    });

    this.preencherTecnico();
  }

  preencherTecnico() {
    if (!this.tecnicoId) {
      (this.tecnicoForm.get('telefones') as FormArray).push(this.createTelefone());
    } else {
      this.getBuscarTecnico();
    }
  }

  getBuscarTecnico() {
    if (this.tecnicoId) {
      this.tecnicoService.getTecnicoById(this.tecnicoId).subscribe({
        next: tecnico => {
          this.tecnicoForm.patchValue(tecnico);
          const telefones = this.tecnicoForm.get('telefones') as FormArray;
          tecnico.telefones.forEach(t => {
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

  // Transforma o Telefone em um FormArray
  get telefones() {
    return (this.tecnicoForm.get('telefones') as FormArray).controls;
  }

  // Cria os campos do Telefone
  createTelefone() {
    return this.fb.group({
      ddd: ['', Validators.required],
      numero: ['', Validators.required]
    });
  }

  // Adiciona mais Itens de Telefone
  adicionarTelefone() {
    const telefones = this.tecnicoForm.get('telefones') as FormArray;
    telefones.push(this.createTelefone());
  }

  // Remove Itens de Telefone
  removerTelefone(telefoneIndex: number) {
    const telefones = this.tecnicoForm.get('telefones') as FormArray;
    telefones.removeAt(telefoneIndex);
  }

  salvar() {
    const tecnico = this.tecnicoForm.value;

    if (tecnico) {
      this.tecnicoService.update(tecnico).subscribe({
        next: tecnicoEditar => {
          this.toaster.showSuccess('Técnico alterado com sucesso', 'Sucesso');
          this.route.navigate(['/administrativo/tecnicos']);
        }, error: error =>  { console.log(error); }
      });
    } else {
      this.tecnicoService.create(tecnico).subscribe({
        next: tecnicoSalvar => {
          this.toaster.showSuccess('Técnico cadastrado com sucesso', 'Sucesso');
          this.route.navigate(['/administrativo/tecnicos']);
        }, error: error =>  { console.log(error); }
      });
    }
  }

  getTituloDinamico() {
    if (this.tecnicoId) {
      this.titulo = 'Editar';
    } else {
      this.titulo = 'Novo';
    }
  }

  voltar() {
    this.route.navigate(['/administrativo/tecnicos']);
  }

}
