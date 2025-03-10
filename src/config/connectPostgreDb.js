const { Pool } = require('pg');
const { createSchema } = require("../Schemas/createSchema.js");
const { createTable } = require("../Schemas/createTable.js");

const pool = new Pool({
  host: process.env.PG_DB_HOST || 'localhost',
  port: process.env.PG_DB_PORT || 5432,
  user: process.env.PG_DB_USER || 'postgres',
  password: process.env.PG_DB_PASSWORD || 'root',
  database: process.env.PG_DB_NAME || 'ETax',
});

module.exports = {
    pool,
    connectDB: async () => {
      try {
          const schemaName = process.env.SCHEMA_NAME || 'tax_system';
          const tableName = process.env.TABLE_NAME || 'users';
  
          await createSchema(schemaName, pool);
          await createTable(schemaName, tableName, pool);
      } catch (error) {
          console.error(error);
          throw new Error("Error: Failed to connect to the database");
      }
  }
};