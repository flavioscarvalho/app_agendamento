console.log('Rotas de admin configuradas em /admin');
console.log('Rotas de responsável configuradas em /responsavel');

const express = require('express'); // Framework Express para o servidor
const bodyParser = require('body-parser'); // Middleware para parsing do body
const cors = require('cors'); // Middleware para habilitar CORS

// Importar rotas
const adminRoutes = require('./routes/admin'); // Rotas do administrador
const responsavelRoutes = require('./routes/responsavel'); // Rotas do responsável

// Inicializar o app
const app = express();

// Middlewares globais
app.use(cors()); // Permite requisições de diferentes origens (necessário para o Postman e futuras integrações)
app.use(bodyParser.json()); // Habilita parsing de JSON no body das requisições
app.use(bodyParser.urlencoded({ extended: true })); // Habilita parsing de dados URL-encoded (formulários)

// Configuração de rotas
console.log('Rotas do administrador configuradas com sucesso!');
app.use('/admin', adminRoutes); // Todas as rotas de `admin.js` estarão disponíveis com o prefixo `/admin`

console.log('Rotas do responsável configuradas com sucesso!');
app.use('/responsavel', responsavelRoutes); // Todas as rotas de `responsavel.js` estarão disponíveis com o prefixo `/responsavel`

// Rota padrão para teste de conexão
app.get('/', (req, res) => {
    res.json({ mensagem: 'Conexão com o backend funcionando!' });
});

// Middleware global para erros
app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
});

// Exportar o app para ser usado no `server.js`
module.exports = app;
