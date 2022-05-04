const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var fileupload = require("express-fileupload");


const Database = require('./conf/database');
const config = require('./conf/config');
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const Usuario = require('./routes/usuarioRoutes');
const Etiqueta = require('./routes/etiquetaRoutes');
const Problema = require('./routes/problemaRoutes');
const Solucion = require('./routes/solucionRoutes');
const Tema = require('./routes/temaRoutes');
const Drive = require('./routes/driveRoutes');

app.use('/usuarios', Usuario);
app.use('/etiquetas', Etiqueta);
app.use('/problemas', Problema);
app.use('/soluciones', Solucion);
app.use('/temas', Tema);
app.use('/drive', Drive);

Database.connect();

app.listen(config.PORT, () =>{
    console.log('Server on port 8080');
});