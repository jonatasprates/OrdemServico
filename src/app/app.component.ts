import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gestaoOrdemServico';

  constructor(private route: Router ) { }

  ngOnInit() {
    if (!sessionStorage.getItem('usuario.ordem.servico')) {
      this.route.navigate(['autenticacao/login']);
    } else {
      this.route.navigate(['administrativo']);
    }
  }

}
