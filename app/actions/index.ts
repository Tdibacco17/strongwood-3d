'use server'
import { getConnection } from "@/lib/db";
import { PresupuestoInterface } from "@/types/apiTypes";

export async function getPresupuestos(limit: number = 100): Promise<PresupuestoInterface[] | null> {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
        SELECT TOP (${limit}) *
        FROM [strong].[dbo].[Presupuesto]
        ORDER BY Fecha DESC
        `);

        return result.recordset as PresupuestoInterface[];
    } catch (error) {
        console.error('Error al obtener presupuestos:', error);
        return null;
    }
}

export async function getPresupuestoDetalle(idPresupuesto: number) {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('idpresupuesto', idPresupuesto)
            .query(`SELECT * FROM [strong].[dbo].[PresupuestoDetalle] WHERE idpresupuesto = @idpresupuesto`);
        return result.recordset;
    } catch (error) {
        console.error(`Error al obtener detalle del presupuesto ${idPresupuesto}:`, error);
        return null;
    }
}
