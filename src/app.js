console.log('Rotas de admin configuradas em /admin');

const express = require('express'); // Framework Express para o servidor
const bodyParser = require('body-parser'); // Middleware para parsing do body
const cors = require('cors'); // Middleware para habilitar CORS

// Importar rotas
const adminRoutes = require('./routes/admin'); // Certifique-se de que o caminho está correto

// Inicializar o app
const app = express();

// Middlewares globais
app.use(cors()); // Permite requisições de diferentes origens (necessário para o Postman e futuras integrações)
app.use(bodyParser.json()); // Habilita parsing de JSON no body das requisições
app.use(bodyParser.urlencoded({ extended: true })); // Habilita parsing de dados URL-encoded (formulários)

// Configuração de rotas
app.use('/admin', adminRoutes); // Todas as rotas de `admin.js` estarão disponíveis com o prefixo `/admin`

// Exportar o app para ser usado no `server.js`
module.exports = app;
