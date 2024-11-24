const pool = require('../config/db'); // Importa o pool de conexões diretamente de db.js

// Criar um novo usuário
const criarUsuario = async (nome, tipo, usuario, senha) => {
  const query = `
    INSERT INTO usuarios (nome, tipo, usuario, senha)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const valores = [nome, tipo, usuario, senha];
  const resultado = await pool.query(query, valores);
  return resultado.rows[0]; // Retorna o usuário recém-criado
};

// Buscar um usuário pelo tipo e usuário
const buscarUsuarioPorTipo = async (usuario, tipo) => {
  const query = `
    SELECT * FROM usuarios
    WHERE usuario = $1 AND tipo = $2;
  `;
  const valores = [usuario, tipo];
  const resultado = await pool.query(query, valores);
  return resultado.rows[0]; // Retorna o usuário encontrado
};

module.exports = { criarUsuario, buscarUsuarioPorTipo };
