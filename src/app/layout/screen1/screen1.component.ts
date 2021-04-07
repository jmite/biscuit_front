import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Parametro } from 'src/app/dominio/utils/parametro.entity';
import { DateUtil } from 'src/app/infraestructura/transversal/utils/date-util';
import { VentasMensualesResponse } from 'src/app/presentacion/agentesservicio/dto/reporteVentasMensualesdto';
import { ReporteAgenteService } from 'src/app/presentacion/agentesservicio/reporte-agente.service';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss']
})
export class Screen1Component implements OnInit {

  loading = false;
  mostrar_grafico = false;
  events: string[] = [];
  fecha: any;
  response: VentasMensualesResponse;
  filtros_request: Parametro[] = [];
  displayedColumns: string[] = ['puntoventa', 'dia', 'ticketdia', 'mes', 'ticketmes', 'pptomes', 'dif', 'cump'];
  dataSource = null;


  /* Charts info */

  public lineChartData: ChartDataSets[] =  [
    { data: [], label: 'Ventas Mensuales' },
  ];
  public lineChartLabels: Label[] =  [];//['January', 'February', 'March', 'April', 'May', 'June', 'July'];;
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(63, 81, 181)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public valores = [];

  constructor(private _reporteService: ReporteAgenteService) { }

  ngOnInit() {
  }

  async consultarVentas(filtros: Parametro[]) {
    console.log('consultandooo')
    this.lineChartLabels = []
    this.lineChartData = []
    this.valores = []
    this.dataSource = null;
    this.loading = true;
    this.mostrar_grafico = false;
    this._reporteService.obtenerVentasMensuales(filtros).subscribe(
      data => {
        this.loading = false;
        this.response = data;
        this.dataSource = this.response.detalles;
        //this.procesarGrafico(this.response.detalles);
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

  public downloadPDF(): void {
    const doc = new jsPDF()

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    //doc.autoTable({ html: '#my-table' })

    let lista = []
    this.response.detalles.forEach(element => {
        const detalle = [];
        detalle.push(element.centro_costo);
        detalle.push(element.total_dia);
        detalle.push(element.total_mes);
        detalle.push(element.ppto_mes);
        detalle.push(element.dif);
        detalle.push(element.cumpl);
        lista.push(detalle);
    });

    console.log(lista)

    // Or use javascript directly:
    doc.text('Reporte de ventas diarias '+ this.fecha, 75, 45);
    doc.autoTable({
      head: [['Punto de venta', 'Dia ', 'Mes', 'Ppto mes', 'Dif', '& cumpl']],
      body: lista,
      startX: 15,
      startY: 60,
    })

    doc.save('ventas_mensual.pdf')
  }

  procesarGrafico(detalles :any){

    detalles.forEach(element => {
        if (element.centro_costo != 'TOTALES'){
          this.lineChartLabels.push(element.centro_costo);
          this.valores.push(element.total_mes)
        }
    });
    this.lineChartData = [{ data : this.valores, label: 'Ventas Mensual'}]
    this.mostrar_grafico = true;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(event.value){
      const string = DateUtil.toString(event.value);
      this.fecha = string;
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
