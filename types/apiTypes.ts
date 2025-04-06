export interface PresupuestoInterface {
    Id: number;
    IdClientes: number;
    Codigo: string;
    Fecha: string; // o Date si lo vas a transformar después
    FechaEntrega: string; // o Date
    Descripcion: string;
    Dolar: number;
    CostoPesos: number;
    CostoDolares: number;
    PrecioPesos: number;
    PrecioDolares: number;
    Estado: number;
    IdProducto1: number;
    IdProducto2: number;
    IdProducto3: number;
    IdPedidos: number;
    IdProducto4: number;
    Cantidad1: number;
    Cantidad2: number;
    Cantidad3: number;
    Cantidad4: number;
    TipoCocina: string | null;
    Observaciones: string | null;
}
