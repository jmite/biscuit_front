import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../dominio/autenticacion/usuario.entity';
import { LoginRequest } from '../presentacion/agentesservicio/dto/login-request';
import { LoginManagerService } from '../presentacion/agentesservicio/jobs/login-manager.service';
import { GlobalService } from '../presentacion/forms/utils/global.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    formulario: FormGroup;
    loading = false;
    mensaje: string;
    submited: boolean;

    constructor(private router: Router,
                private globalData: GlobalService,
                private formBuilder: FormBuilder,
                private loginManager: LoginManagerService) { 
        this.formulario = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
});
    }

    ngOnInit() { }

    async onSubmit() {
        console.log("asdasdasd");
        this.mensaje = '';
        this.submited = true;

        if (this.formulario.invalid) {
          return;
        }

        try
        {

            /*this.loading = true; */
            const loginRequest = new LoginRequest();

            loginRequest.password = this.formulario.get('password').value;
            loginRequest.username = this.formulario.get('username').value;

            const logindata = await this.loginManager.login(loginRequest);
            this.loading = false;

            console.log(logindata);

            let usuarioGlobalData = new Usuario();
            usuarioGlobalData.tokenAccess = logindata.access;
            usuarioGlobalData.tokenRefresh = logindata.refresh;

            this.globalData.usuario = usuarioGlobalData;
            localStorage.setItem('globaldata', JSON.stringify(this.globalData));


            localStorage.setItem('isLoggedin', 'true');
            this.router.navigate(['/dashboard']);

        }catch(error){
            this.loading = false;
            this.submited = false;
            if (error instanceof HttpErrorResponse){
                this.mensaje = error.error.detail;
                switch(error.status){
                  case 400:
                    break;
                  case 401: // Clave o usuario incorrecta
                    this.mensaje = error.error.detail;
                    break;
                  case 403: // UsuarioDto cliente intenta logearse en sistema web
                    this.mensaje = error.error.detail; 
                    break;
                  case 500:
                    break;
                    default:
                      this.mensaje = 'Ha ocurrido un error desconocido.';
                }
            }else{
              this.mensaje = 'Ha ocurrido un error.';
              console.log(error);
            }
  
      }
    }
}
