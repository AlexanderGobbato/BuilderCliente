const express       = require('express');
const app           = express();
const db            = require('./db/connection');
const bodyParser    = require('body-parser');

const PORT = 3000;

app.listen(PORT, function() {
    console.log('Servidor rodando na porta ' + PORT);
});

//body parser
app.use(bodyParser.urlencoded({extended: false}));

//db connection
db
    .authenticate()
    .then(() => {
        console.log('sucesso na conexão');
    })
    .catch(err => {
        console.log('Erro', err);
    });

//routes
app.get('/',(req, res)=>{
    res.send('Executando na porta 3000');
});

//contato rotes
app.use('/clientes',require('./routes/clientes'))

