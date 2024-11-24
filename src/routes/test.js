const express = require('express');
const { criarExercicio, listarExercicios, listarExerciciosComFiltros, buscarExercicioPorId, atualizarExercicio, excluirExercicio } = require('../models/exercicios');

const router = express.Router();

// Criar um novo exercício
router.post('/exercicio', async (req, res) => {
  try {
    const { idProfessor, turma, materia, dataPostagem, dataEntrega } = req.body;
    const novoExercicio = await criarExercicio(idProfessor, turma, materia, dataPostagem, dataEntrega);
    res.json(novoExercicio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar exercício.' });
  }
});

// Listar todos os exercícios
router.get('/exercicios', async (req, res) => {
  try {
    const exercicios = await listarExercicios();
    res.json(exercicios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar exercícios.' });
  }
});

// Testar filtros
router.get('/exercicios-filtrados', async (req, res) => {
  try {
    const { turma, ultimosDias } = req.query;
    const exercicios = await listarExerciciosComFiltros(turma, ultimosDias);
    res.json(exercicios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar exercícios com filtros.' });
  }
});

module.exports = router;
