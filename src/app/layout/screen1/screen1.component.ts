import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Parametro } from 'src/app/dominio/utils/parametro.entity';
import { DateUtil } from 'src/app/infraestructura/transversal/utils/date-util';
import { VentasMensualesResponse } from 'src/app/presentacion/agentesservicio/dto/reporteVentasMensualesdto';
import { ReporteAgenteService } from 'src/app/presentacion/agentesservicio/reporte-agente.service';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss']
})
export class Screen1Component implements OnInit {

  loading = false;
  events: string[] = [];
  fecha: any;
  response: VentasMensualesResponse;
  filtros_request: Parametro[] = [];
  displayedColumns: string[] = ['puntoventa', 'dia', 'mes', 'pptomes', 'dif', 'cump'];
  dataSource = null;

  constructor(private _reporteService: ReporteAgenteService) { }

  ngOnInit() {
  }

  async consultarVentas(filtros: Parametro[]) {
    console.log('consultandooo')
    this.dataSource = null;
    this.loading = true;
    this._reporteService.obtenerVentasMensuales(filtros).subscribe(
      data => {
        this.loading = false;
        this.response = data;
        this.dataSource = this.response.detalles;
      
      },
      error => {
        this.loading = false;
        switch (error.status) {
          case 404:
            console.log('error 404')
            break;
          case 500:
            console.log('error 500')
            break;
        }
      });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(event.value){
      const string = DateUtil.toString(event.value);
      console.log(string)
      console.log('finalizaddodoo fechaa')
      this.filtros_request = []
      const param = new Parametro("fecha", string);
      this.filtros_request = Parametro.agregarParametro(param, this.filtros_request);
      this.consultarVentas(this.filtros_request);
    }
    console.log('fecha cambiada')
  }

}
