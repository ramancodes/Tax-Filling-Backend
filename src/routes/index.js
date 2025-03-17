const path = require("path");
const { glob } = require("glob");

const basename = path.basename(__filename);

module.exports = async (router) => {
  try {
    const temp_files = await glob(`${__dirname}/**/*.js`.replace(/\\/g, "/"));
    const files = temp_files.map((file) => file.replace(/\\/g, "/"));

    files
      .filter((file) => {
        const fileName = file.split("/");
        return (
          fileName[fileName.length - 1].indexOf(".") !== 0 &&
          fileName[fileName.length - 1] !== basename &&
          fileName[fileName.length - 1].slice(-3) === ".js"
        );
      })
      .forEach((file) => {
        // Dynamically require and pass the router
        require(file)(router);
      });
  } catch (err) {
    console.error("Error loading routes:", err);
  }
};
