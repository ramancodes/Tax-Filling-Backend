const path = require("path");
const { glob } = require("glob");
const basename = path.basename(__filename);
const Controllers = {};

// Function to load Common
const loadControllers = async () => {
  try {
    const temp_files = await glob(`${__dirname}/**/*.js`.replace(/\\/g, "/"));
    const files = temp_files.map((file) => file.replace(/\\/g, "/"));

    const servicePromises = files
      .filter((file) => {
        const fileName = path.basename(file);
        return fileName.indexOf(".") !== 0 && fileName !== basename && fileName.slice(-3) === ".js";
      })
      .map((file) => {
        return new Promise((resolve) => {
          const serviceName = path.basename(file, ".js");
          Controllers[serviceName] = require(file);
          resolve();
        });
      });

    await Promise.all(servicePromises);
    console.log("Controllers loaded successfully");
  } catch (err) {
    console.log("Error loading  Controller:", err);
  }
};

// Export the loadControllers function and the Controller object
module.exports = { loadControllers, Controllers };
