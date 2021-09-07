import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceGenerator } from './base/service-generator';

@Injectable({
  providedIn: 'root'
})
export class SincronizacionAgenteService extends ServiceGenerator {

  constructor(private http: HttpClient) { super(); }

  sincronizarCategorias(): Observable<any> {
    return this.http.get<any>(this.buildurl('sincronizacion/categorias/'));
  }

  sincronizarBodegas(): Observable<any> {
    return this.http.get<any>(this.buildurl('sincronizacion/bodegas/'));
  }

  sincronizarCentrosCosto(): Observable<any> {
    return this.http.get<any>(this.buildurl('sincronizacion/centos-costo/'));
  }

  snincronizarProductos(): Observable<any> {
    return this.http.get<any>(this.buildurl('sincronizacion/productos/'));
  }

  sincronizarCompras(): Observable<any> {
    return this.http.get<any>(this.buildurl('sincronizacion/compras/'));
  }

  sincronizarVentas(): Observable<any> {
    return this.http.get<any>(this.buildurl('sincronizacion/ventas/'));
  }

}
