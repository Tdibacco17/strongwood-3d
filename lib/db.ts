import sql from 'mssql';

const config: sql.config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER!,
    database: process.env.DB_NAME,
    port: parseInt(process.env.MSSQL_PORT || '1433'),
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

let pool: sql.ConnectionPool | null = null;

export const getConnection = async () => {
    if (!pool) {
        pool = await sql.connect(config);
    }
    return pool;
};

export default sql;
