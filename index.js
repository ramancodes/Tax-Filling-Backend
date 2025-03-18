const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { loadCommons } = require('./src/common/index.js');
const { loadValidations } = require('./src/validations/index.js');
const { loadControllers } = require('./src/controllers/index.js');
const { loadModels, Models } = require('./src/models/index.js');

// load glob files
( async () => {
    await loadControllers();
    await loadCommons();
    await loadValidations();
    await loadModels();

    const app = express();
    const port = process.env.PORT || 9000;
    const router = require('express').Router();
    require("./src/routes")(router);
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

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
