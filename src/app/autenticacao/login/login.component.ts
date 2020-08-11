import { Router } from '@angular/router';
import { LoginService } from './../../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
       private fb: FormBuilder,
       private loginService: LoginService,
       private router: Router
    ) {}

    loginForm: FormGroup;

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            senha: ['', Validators.required]
        });
    }

    login() {
        if (this.loginForm.invalid) {
            return;
        }

        const {email, senha} = this.loginForm.value;

        this.loginService.login(email, senha).subscribe({
            next: usuarios => {
                if (usuarios.length) {
                    const usuario = usuarios[0];
                    sessionStorage.setItem('usuario.ordem.servico', JSON.stringify(usuario));
                    this.router.navigate(['administrativo']);
                } else {

                }

            },
            error: error => {
                console.log(error);
            }
        });
    }

}
