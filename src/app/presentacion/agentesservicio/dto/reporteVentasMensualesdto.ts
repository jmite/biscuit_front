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
    ppto_mes: 0;
    dif: 0;
    cumpl: string;
}