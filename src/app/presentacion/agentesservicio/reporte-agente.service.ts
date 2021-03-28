import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parametro } from 'src/app/dominio/utils/parametro.entity';
import { ServiceGenerator } from './base/service-generator';

@Injectable({
  providedIn: 'root'
})
export class ReporteAgenteService extends ServiceGenerator {

  constructor(private http: HttpClient) { super(); }

  obtenerVentasMensuales(filtros: Parametro[]): Observable<any> {
    let params_url = Parametro.buildParamsUlr(filtros);
    return this.http.get<any>(this.buildurl('reportes/ventas-mensuales/' + params_url));
  }


  obtenerVentasComparativo(filtros: Parametro[]): Observable<any> {
    let params_url = Parametro.buildParamsUlr(filtros);
    return this.http.get<any>(this.buildurl('reportes/comparativo-ventas/' + params_url));
  }
}
