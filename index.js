const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log("Server Running in port", port));