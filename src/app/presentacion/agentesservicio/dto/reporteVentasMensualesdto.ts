export class VentasMensualesResponse {
    fecha_consulta: string;
    total_dia: number;
    total_mes: number;
    detalles: DetalleVentasMensuales[];

}


export class DetalleVentasMensuales{
    centro_costo: string;
    total_dia: number;
    total_mes: number;
    ticket_promedio_dia: 0;
    ticket_promedio_mes: 0;
    ppto_mes: 0;
    dif: 0;
    cumpl: string;
}