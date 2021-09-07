import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SincronizacionAgenteService } from 'src/app/presentacion/agentesservicio/sincronizacion-agente.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    }

    constructor(private _serviceSincronizacion: SincronizacionAgenteService,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit() {}

    sincronizarCategorias() {
        this._serviceSincronizacion.sincronizarCategorias().subscribe(
            data => {
                this._snackBar.open('Se envio a sincronizar categorias', 'ok');
            },
            error => {
              switch (error.status) {
                case 404:
                  console.log('error 404');
                  break;
                case 500:
                  console.log('error 500');
                  break;
              }
            });
    }

    sincronizarBodegas() {
        this._serviceSincronizacion.sincronizarBodegas().subscribe(
            data => {
                this._snackBar.open('Se envio a sincronizar bodegas', 'ok');
            },
            error => {
              switch (error.status) {
                case 404:
                  console.log('error 404');
                  break;
                case 500:
                  console.log('error 500');
                  break;
              }
            });
    }

    sincronizarCentrosCosto() {
        this._serviceSincronizacion.sincronizarCentrosCosto().subscribe(
            data => {
                this._snackBar.open('Se envio a sincronizar centros de costo', 'ok');
            },
            error => {
              switch (error.status) {
                case 404:
                  console.log('error 404');
                  break;
                case 500:
                  console.log('error 500');
                  break;
              }
            });
    }

    sincronizarProductos() {
        this._serviceSincronizacion.snincronizarProductos().subscribe(
            data => {
                this._snackBar.open('Se envio a sincronizar productos', 'ok');
            },
            error => {
              switch (error.status) {
                case 404:
                  console.log('error 404');
                  break;
                case 500:
                  console.log('error 500');
                  break;
              }
            });
    }


    sincronizarCompras() {
        this._serviceSincronizacion.sincronizarCompras().subscribe(
            data => {
                this._snackBar.open('Se envio a sincronizar compras', 'ok');
            },
            error => {
              switch (error.status) {
                case 404:
                  console.log('error 404');
                  break;
                case 500:
                  console.log('error 500');
                  break;
              }
            });
    }


    sincronizarVentas() {
        this._serviceSincronizacion.sincronizarVentas().subscribe(
            data => {
                this._snackBar.open('Se envio a sincronizar ventas', 'ok');
            },
            error => {
              switch (error.status) {
                case 404:
                  console.log('error 404');
                  break;
                case 500:
                  console.log('error 500');
                  break;
              }
            });
    }
}
