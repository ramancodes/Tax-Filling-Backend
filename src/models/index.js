const path = require("path");
const { glob } = require("glob");
const { Sequelize, DataTypes, Op } = require("sequelize");

const basename = path.basename(__filename);
const Models = {};

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || "ETax", 
  process.env.DATABASE_USER || "postgres", 
  process.env.DATABASE_PASS || "root", 
  {
    dialect: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
  }
);

// Function to load Models
const loadModels = async () => {
  try {
    const temp_files = await glob(`${__dirname}/**/*.js`.replace(/\\/g, "/"));
    const files = temp_files.map((file) => file.replace(/\\/g, "/"));

    const filteredFiles = files.filter((file) => {
      const fileName = path.basename(file);
      return (
        fileName.indexOf(".") !== 0 && // Ignore hidden files
        fileName !== basename && // Ignore the current file
        fileName.slice(-3) === ".js" // Only include .js files
      );
    });

    // Load each model file into the db object
    await Promise.all(
      filteredFiles.map(async (file) => {
        const modelName = path.basename(file, ".js"); // Get model name
        Models[modelName] = require(file)(sequelize, DataTypes); // Initialize model
      })
    );

    console.log("Available models:", Object.keys(Models));
    Object.keys(Models).forEach((modelName) => {
      if (Models[modelName].associate) {
        Models[modelName].associate(Models);
      }
    });
    
    console.log("Models loaded successfully");
  } catch (err) {
    console.error("Error loading  Models:", err);
  }
};

Models.sequelize = sequelize;
Models.Sequelize = Sequelize;
Models.Op = Op;
module.exports = { loadModels, Models };
