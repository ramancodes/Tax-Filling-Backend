const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { router } = require('./src/routes/router');
const { connectDB } = require('./src/config/connectPostgreDb.js');
const { loadCommons } = require('./src/common/index.js');
const { loadValidations } = require('./src/validations/index.js')


const app = express();
const port = process.env.PORT || 3000;

// connect to postgresql
connectDB();

// load glob files
loadCommons();
loadValidations();

app.use('/api', router);

app.listen(port, ()=>console.log("Server Running in port", port));