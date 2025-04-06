'use server';

import { getConnection } from '@/lib/db';

export async function testDbConnection(): Promise<string> {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT 1 as test');
        return result.recordset[0].test === 1 ? 'ok' : 'fail';
    } catch (error) {
        console.error('DB connection error:', error);
        return 'fail';
    }
}
