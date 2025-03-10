module.exports = {
    createSchema: async (schemaName, pool) => {
        const client = await pool.connect();
        try {
          await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName};`);
          console.log(`Schema "${schemaName}" now available.`);
        } catch (err) {
          console.error('Error creating schema:', err);
        } finally {
          client.release();
        }
    }
};