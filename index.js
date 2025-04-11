const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createFiles } = require('./src/config/createReqFile.js');
const cookieParser = require("cookie-parser");
const useragent = require("express-useragent");
const compression = require("compression");
const { loadCommons } = require('./src/common/index.js');
const { loadValidations } = require('./src/validations/index.js');
const { loadControllers } = require('./src/controllers/index.js');
const { loadModels, Models } = require('./src/models/index.js');

// load glob files
( async () => {
    await createFiles();
    await loadControllers();
    await loadCommons();
    await loadValidations();
    await loadModels();

    const app = express();
    const port = process.env.PORT || 9000;
    const router = require('express').Router();
    require("./src/routes")(router);
    app.use(cors());
    app.use(
        express.urlencoded({
          extended: true,
          limit: "100mb",
          parameterLimit: 100000
        })
      );
    app.use(express.json({ limit: "100mb" }));
    app.use(cookieParser());
    app.use(useragent.express());
    app.use(
        compression({
          level: 6, // Balanced compression
          threshold: "100kb" // Only compress data above 100kb
        })
    );

    // await Models.sequelize.sync({ force: true })
    await Models.sequelize.sync()
    .then(()=>{
        console.log("Database synced!");
        app.use('/api', router);
        app.listen(port, ()=>console.log("Server Running in port", port));
    })
    .catch((err)=>{
        console.log("Error in database syncing", err);
    });
})();
