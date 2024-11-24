const pool = require('../config/db'); // Certifique-se de usar o caminho correto para o pool de conexões

// Criar um novo exercício
const criarExercicio = async (idProfessor, turma, materia, dataPostagem, dataEntrega) => {
  const query = `
    INSERT INTO exercicios (id_professor, turma, materia, data_postagem, data_entrega)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const valores = [idProfessor, turma, materia, dataPostagem, dataEntrega];
  const resultado = await pool.query(query, valores);
  return resultado.rows[0]; // Retorna o exercício recém-criado
};

// Listar todos os exercícios (sem filtros)
const listarExercicios = async () => {
  const query = `
    SELECT e.id, e.turma, e.materia, e.data_postagem, e.data_entrega, u.nome AS professor
    FROM exercicios e
    JOIN usuarios u ON e.id_professor = u.id;
  `;
  const resultado = await pool.query(query);
  return resultado.rows; // Retorna todos os exercícios
};

// Listar exercícios com filtros (turma e últimos dias)
const listarExerciciosComFiltros = async (turma, ultimosDias) => {
  let query = `
    SELECT e.id, e.turma, e.materia, e.data_postagem, e.data_entrega, u.nome AS professor
    FROM exercicios e
    JOIN usuarios u ON e.id_professor = u.id
    WHERE 1=1
  `;
  const valores = [];

  // Filtro por turma
  if (turma) {
    query += ' AND e.turma = $1';
    valores.push(turma);
  }

  // Filtro por últimos dias
  if (ultimosDias) {
    query += ' AND e.data_postagem >= NOW() - INTERVAL $2 DAY';
    valores.push(ultimosDias);
  }

  const resultado = await pool.query(query, valores);
  return resultado.rows; // Retorna os exercícios filtrados
};

// Buscar um exercício por ID
const buscarExercicioPorId = async (id) => {
  const query = `
    SELECT e.id, e.turma, e.materia, e.data_postagem, e.data_entrega, u.nome AS professor
    FROM exercicios e
    JOIN usuarios u ON e.id_professor = u.id
    WHERE e.id = $1;
  `;
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0]; // Retorna o exercício correspondente
};

// Atualizar um exercício
const atualizarExercicio = async (id, turma, materia, dataPostagem, dataEntrega) => {
  const query = `
    UPDATE exercicios
    SET turma = $2, materia = $3, data_postagem = $4, data_entrega = $5
    WHERE id = $1
    RETURNING *;
  `;
  const valores = [id, turma, materia, dataPostagem, dataEntrega];
  const resultado = await pool.query(query, valores);
  return resultado.rows[0]; // Retorna o exercício atualizado
};

// Excluir um exercício
const excluirExercicio = async (id) => {
  const query = `
    DELETE FROM exercicios
    WHERE id = $1
    RETURNING *;
  `;
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0]; // Retorna o exercício excluído
};

module.exports = {
  criarExercicio,
  listarExercicios,
  listarExerciciosComFiltros,
  buscarExercicioPorId,
  atualizarExercicio,
  excluirExercicio,
};
