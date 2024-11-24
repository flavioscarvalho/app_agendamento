// Carregar as variáveis de ambiente
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

// Testar se as variáveis foram carregadas corretamente
console.log('Variáveis carregadas do .env:', {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  PORT: process.env.PORT,
});

// Importar o app principal
const app = require('./app');

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
