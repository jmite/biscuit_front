import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { LoginRequest } from './dto/login-request';
import { ServiceGenerator } from './base/service-generator';
import { LoginResponse } from './dto/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginAgenteService extends ServiceGenerator {


  constructor(private http: HttpClient) { super(); }

  LoginSendRequest(loginRequest: LoginRequest): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('username', loginRequest.username);
    formData.append('password', loginRequest.password);
    return this.http.post<any>(this.buildurl('autenticacion/token/'), formData);
  }

}
