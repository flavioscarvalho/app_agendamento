const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const router = express.Router();

// Middleware para verificar se o usuário está autenticado
const autenticarResponsavel = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Token no formato "Bearer TOKEN"
  if (!token) {
    return res.status(401).json({ erro: 'Token de autenticação não fornecido.' });
  }

  try {
    const usuario = jwt.verify(token, process.env.SECRET_KEY); // Verifica o token com a chave secreta
    req.usuario = usuario;
    next();
  } catch (err) {
    console.error('Erro na verificação do token:', err);
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};

// Rota 1: Login do responsável
router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ erro: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const query = 'SELECT * FROM usuarios WHERE usuario = $1 AND tipo = $2';
    const resultado = await pool.query(query, [usuario, 'responsavel']);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    const usuarioEncontrado = resultado.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario, tipo: usuarioEncontrado.tipo },
      process.env.SECRET_KEY,
      { expiresIn: '2h' } // Token válido por 2 horas
    );

    res.json({ mensagem: 'Login bem-sucedido.', token });
  } catch (err) {
    console.error('Erro ao realizar login:', err);
    res.status(500).json({ erro: 'Erro ao realizar login. Por favor, tente novamente.' });
  }
});

// Rota 2: Listar exercícios com filtros
router.get('/exercicios', autenticarResponsavel, async (req, res) => {
  const { turma, ultimosDias } = req.query;

  try {
    let query = `
      SELECT e.id, e.materia, e.data_postagem, e.data_entrega, u.nome AS professor
      FROM exercicios e
      JOIN usuarios u ON e.id_professor = u.id
      WHERE 1=1
    `;
    const valores = [];

    if (turma) {
      query += ' AND e.turma = $1';
      valores.push(turma);
    }

    if (ultimosDias) {
      query += ' AND e.data_postagem >= NOW() - INTERVAL $2 DAY';
      valores.push(ultimosDias);
    }

    const resultado = await pool.query(query, valores);

    if (resultado.rows.length === 0) {
      return res.json({ mensagem: 'Nenhum exercício encontrado para os filtros aplicados.' });
    }

    res.json({ exercicios: resultado.rows });
  } catch (err) {
    console.error('Erro ao listar exercícios:', err);
    res.status(500).json({ erro: 'Erro ao listar exercícios. Por favor, tente novamente.' });
  }
});

module.exports = router;
