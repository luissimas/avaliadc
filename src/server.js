const app = require('./app')

const port = 3333;

// Ouvindo as requisições na porta especificada
app.listen(port, () => console.log(`Listening on port ${port}...`))

