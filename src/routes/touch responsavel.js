const express = require('express');
const pool = require('../config/db'); // Conexão com o banco de dados

const router = express.Router();

// Rota para listar exercícios com filtros
router.get('/listar-exercicios', async (req, res) => {
  try {
    const { id_turma, id_disciplina, dias } = req.query;

    // Define o intervalo padrão para os últimos 30 dias
    const intervaloDias = dias ? parseInt(dias) : 30;

    // Monta a query base
    let query = `
      SELECT e.id, e.conteudo, e.data_postagem, e.data_entrega, 
             t.nome AS turma, d.nome AS disciplina, u.nome AS professor
      FROM exercicios e
      JOIN turmas t ON e.id_turma = t.id
      JOIN disciplinas d ON e.id_disciplina = d.id
      JOIN usuarios u ON e.id_professor = u.id
      WHERE e.data_postagem >= NOW() - INTERVAL '${intervaloDias} days'
    `;

    // Adiciona filtros opcionais
    const valores = [];
    if (id_turma) {
      query += ` AND e.id_turma = $${valores.length + 1}`;
      valores.push(id_turma);
    }
    if (id_disciplina) {
      query += ` AND e.id_disciplina = $${valores.length + 1}`;
      valores.push(id_disciplina);
    }

    // Executa a query
    const resultado = await pool.query(query, valores);
    res.json({ exercicios: resultado.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar os exercícios.' });
  }
});

module.exports = router;
