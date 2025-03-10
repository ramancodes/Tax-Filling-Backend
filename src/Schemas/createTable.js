module.exports = {
    createUserTable: async (schemaName, tableName, pool) => {
        const client = await pool.connect();
        try {
          await client.query(`
            CREATE TABLE IF NOT EXISTS ${schemaName}.${tableName} (
            userid VARCHAR(20) NOT NULL,
            username VARCHAR(20) NOT NULL UNIQUE,
            password VARCHAR(20) NOT NULL,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            mobileNo BIGINT,
            PRIMARY KEY (userid)
            );
          `);
          console.log(`Table "${tableName}" available in schema "${schemaName}".`);
        } catch (err) {
          console.error('Error creating table:', err);
        } finally {
          client.release();
        }
    }
};