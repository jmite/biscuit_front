import { Injectable } from '@angular/core';
import { LoginRequest } from '../dto/login-request';
import { LoginAgenteService } from '../login-agente.service';
import {Ability} from '@casl/ability';


@Injectable()
export class LoginManagerService {

  private loginRequest: LoginRequest;

  constructor(
    private loginAgente: LoginAgenteService,
    private ability: Ability) {
    }

  /* #region Login y datos usuario */

  async login(loginRequest: LoginRequest): Promise<any> {
    this.loginRequest = loginRequest;
    this.ability.update([]);
    return await this.loginAgente.LoginSendRequest(loginRequest).toPromise();
  }

}
