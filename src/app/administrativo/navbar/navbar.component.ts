import { Usuario } from './../../shared/entity/Usuario';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioLogado: Usuario;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getUsuarioLogado();
  }

  getUsuarioLogado() {
    this.usuarioLogado = JSON.parse(sessionStorage.getItem('usuario.ordem.servico'));
  }

  logout() {
    sessionStorage.removeItem('usuario.ordem.servico');
    this.router.navigate(['autenticacao/login']);
  }

}
