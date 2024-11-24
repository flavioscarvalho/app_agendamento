const { pool } = require('../app');

// Criar um novo exercício
const criarExercicio = async (idProfessor, materia, dataPostagem, dataEntrega) => {
  const query = `
    INSERT INTO exercicios (id_professor, materia, data_postagem, data_entrega)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const valores = [idProfessor, materia, dataPostagem, dataEntrega];
  const resultado = await pool.query(query, valores);
  return resultado.rows[0];
};

// Listar todos os exercícios
const listarExercicios = async () => {
  const query = `
    SELECT e.id, e.materia, e.data_postagem, e.data_entrega, u.nome AS professor
    FROM exercicios e
    JOIN usuarios u ON e.id_professor = u.id;
  `;
  const resultado = await pool.query(query);
  return resultado.rows;
};

module.exports = { criarExercicio, listarExercicios };
