const express = require('express');
const cors = require('cors');

// Celebrate errors
const { errors } = require('celebrate')

const routes = require('./routes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors()); // Using celebrate errors

const port = 3333;


// Ouvindo as requisições na porta especificada
app.listen(port, () => console.log(`Listening on port ${port}...`))
