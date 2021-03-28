export class VentasComparativoResponse {
    anio_1: number;
    anio_2: number;
    anio_3: number;
    detalles: DetalleVentaComparativo[];

}


export class DetalleVentaComparativo{
    centro_costo: string;
    anio_1: number;
    valor_1: number;
    anio_2: number;
    valor_2: number;
    porc_anterior: string;
    anio_3: number;
    valor_3: number;
    porc_anterior_anio: string;
}