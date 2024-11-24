require('dotenv').config();
const { Pool } = require('pg');

// Log das variáveis de ambiente para verificação
console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Configuração do pool de conexões
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'app_agendamento',
  password: process.env.DB_PASSWORD || 'root',
  port: parseInt(process.env.DB_PORT, 10) || 5432, // Converte a porta para número
});

// Testar a conexão com o banco
pool.connect()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = pool;
