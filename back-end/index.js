const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(express.json());

const database = require('./db/index.js');
database();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const router = require('./routes/index.js');
router(app, express);

app.listen(3000, function (error) {
    if (error) {
        console.log('Ocorreu um erro ao rodar o servidor');
    } else {
        console.log('Servidor rodando na porta ' + 3000);
    }
});