import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/dominio/autenticacion/usuario.entity';
import { SerializationHelper } from './serialization-helper';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  usuario: Usuario;
  public static pageSize = 25;
  public static pageSizeService = 25;

  isValid() {
    //return this.usuario != null && this.cooperativa != null
    return true;
  }

  clean() {
    this.usuario = null;
  }

  load(datajson: any) {
    if(datajson == null) {
      return;
    }
    const data = JSON.parse(datajson);
    this.usuario = SerializationHelper.toInstance(new Usuario(), data['usuario']);
  }
}
