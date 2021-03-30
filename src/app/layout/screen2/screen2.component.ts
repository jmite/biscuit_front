import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Parametro } from 'src/app/dominio/utils/parametro.entity';
import { DateUtil } from 'src/app/infraestructura/transversal/utils/date-util';
import { VentasComparativoResponse } from 'src/app/presentacion/agentesservicio/dto/reporteVentasComparativodto';
import { ReporteAgenteService } from 'src/app/presentacion/agentesservicio/reporte-agente.service';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss']
})
export class Screen2Component implements OnInit {

  loading = false;
  filtros_request: Parametro[] = [];
  displayedColumns: string[] = ['tienda', 'anio_actual', 'anio_anterior', 'dif', 'anios_atras', 'dif_anterior'];
  dataSource = null;
  response: VentasComparativoResponse;
  fecha_1: any;
  fecha_2:any;


  constructor(private _reporteService: ReporteAgenteService) { }

  ngOnInit() {
  }

  async consultarVentas(filtros: Parametro[]) {
    this.dataSource = null;
    console.log('consultandooo')
    this.loading = true;
    this._reporteService.obtenerVentasComparativo(filtros).subscribe(
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
      this.fecha_1 = string;
      console.log(string)
      console.log('finalizaddodoo fechaa1111')
      const param = new Parametro("fecha_inicio", string);
      this.filtros_request = Parametro.agregarParametro(param, this.filtros_request);
      //this.consultarVentas(this.filtros_request);
    }
    console.log('fecha cambiada')
  }

  addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {
    if(event.value){
      const string = DateUtil.toString(event.value);
      this.fecha_2 = string;
      console.log(string)
      console.log('finalizaddodoo fechaa2222')
      const param = new Parametro("fecha_fin", string);
      this.filtros_request = Parametro.agregarParametro(param, this.filtros_request);
      //this.consultarVentas(this.filtros_request);
    }
    console.log('fecha cambiada')
  }

  
  public downloadPDF(): void {
    const doc = new jsPDF()

    let lista = []
    this.response.detalles.forEach(element => {
        const detalle = [];
        detalle.push(element.centro_costo);
        detalle.push(element.valor_1);
        detalle.push(element.valor_2);
        detalle.push(element.porc_anterior);
        detalle.push(element.valor_3);
        detalle.push(element.porc_anterior_anio);
        lista.push(detalle);
    });

    console.log(lista)

    // Or use javascript directly:
    doc.text('Reporte de ventas comparativo ', 75, 45);
    doc.text('Desde: '+this.fecha_1+' Hasta:'+this.fecha_2, 70, 55);
    doc.autoTable({
      head: [['Tienda', 'Año actual ', 'Año anterior', 'Dif', 'Año atras', 'dif anterior']],
      body: lista,
      startX: 15,
      startY: 60,
    })

    doc.save('ventas_comparativo.pdf')
  }


  consultarReporte(){
    this.consultarVentas(this.filtros_request);
  }

}
