console.log('admin.js foi carregado com sucesso');

const express = require('express');
const bcrypt = require('bcrypt');
const { criarUsuario } = require('../models/usuarios');
const pool = require('../config/db');

const router = express.Router();

// Rota para cadastrar professor
router.post('/cadastrar-professor', async (req, res) => {
  console.log('Requisição recebida para cadastrar professor:', req.body);

  try {
    const { nome, usuario, senha } = req.body;

    if (!nome || !usuario || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Todos os campos (nome, usuario e senha) são obrigatórios.',
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const professor = await criarUsuario(nome, 'professor', usuario, senhaCriptografada);

    res.status(201).json({
      sucesso: true,
      mensagem: 'Professor cadastrado com sucesso!',
      dados: professor,
    });
  } catch (err) {
    console.error('Erro ao cadastrar professor:', err);

    if (err.code === '23505') {
      return res.status(400).json({ sucesso: false, mensagem: 'Usuário já existe.' });
    }

    res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar o professor.' });
  }
});

// Rota para cadastrar turma
router.post('/cadastrar-turma', async (req, res) => {
  console.log('Requisição recebida para cadastrar turma:', req.body);

  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ sucesso: false, mensagem: 'O campo nome é obrigatório.' });
    }

    const query = `INSERT INTO turmas (nome) VALUES ($1) RETURNING *;`;
    const resultado = await pool.query(query, [nome]);

    res.status(201).json({
      sucesso: true,
      mensagem: 'Turma cadastrada com sucesso!',
      dados: resultado.rows[0],
    });
  } catch (err) {
    console.error('Erro ao cadastrar a turma:', err);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar a turma.' });
  }
});

// Rota para cadastrar disciplina
router.post('/cadastrar-disciplina', async (req, res) => {
  console.log('Requisição recebida para cadastrar disciplina:', req.body);

  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ sucesso: false, mensagem: 'O campo nome é obrigatório.' });
    }

    const query = `INSERT INTO disciplinas (nome) VALUES ($1) RETURNING *;`;
    const resultado = await pool.query(query, [nome]);

    res.status(201).json({
      sucesso: true,
      mensagem: 'Disciplina cadastrada com sucesso!',
      dados: resultado.rows[0],
    });
  } catch (err) {
    console.error('Erro ao cadastrar a disciplina:', err);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar a disciplina.' });
  }
});

// Rota para listar turmas
router.get('/listar-turmas', async (req, res) => {
  console.log('Requisição recebida para listar turmas.');

  try {
    const resultado = await pool.query('SELECT * FROM turmas;');

    res.status(200).json({
      sucesso: true,
      dados: resultado.rows,
    });
  } catch (err) {
    console.error('Erro ao listar turmas:', err);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar as turmas.' });
  }
});

// Rota para listar disciplinas
router.get('/listar-disciplinas', async (req, res) => {
  console.log('Requisição recebida para listar disciplinas.');

  try {
    const resultado = await pool.query('SELECT * FROM disciplinas;');
    res.status(200).json({
      sucesso: true,
      dados: resultado.rows,
    });
  } catch (err) {
    console.error('Erro ao listar disciplinas:', err);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar as disciplinas.' });
  }
});




// Rota para excluir turma
router.delete('/excluir-turma/:id', async (req, res) => {
  console.log('Requisição recebida para excluir turma:', req.params);

  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ sucesso: false, mensagem: 'O ID fornecido é inválido.' });
  }

  try {
    const resultado = await pool.query('DELETE FROM turmas WHERE id = $1 RETURNING *;', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ sucesso: false, mensagem: 'Turma não encontrada.' });
    }

    res.json({
      sucesso: true,
      mensagem: 'Turma excluída com sucesso!',
      dados: resultado.rows[0],
    });
  } catch (err) {
    console.error('Erro ao excluir a turma:', err);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir a turma.' });
  }
});

// Rota para excluir disciplina
router.delete('/excluir-disciplina/:id', async (req, res) => {
  console.log('Requisição recebida para excluir disciplina:', req.params);

  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ sucesso: false, mensagem: 'O ID fornecido é inválido.' });
  }

  try {
    const resultado = await pool.query('DELETE FROM disciplinas WHERE id = $1 RETURNING *;', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ sucesso: false, mensagem: 'Disciplina não encontrada.' });
    }

    res.json({
      sucesso: true,
      mensagem: 'Disciplina excluída com sucesso!',
      dados: resultado.rows[0],
    });
  } catch (err) {
    console.error('Erro ao excluir a disciplina:', err);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir a disciplina.' });
  }
});

module.exports = router;

