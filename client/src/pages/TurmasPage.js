import React, { useState, useEffect } from "react";

const TurmasPage = () => {
  const [turmas, setTurmas] = useState([]);
  const [novaTurma, setNovaTurma] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Função para carregar as turmas do backend
  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/turmas");
        const data = await response.json();
        setTurmas(data.turmas || []);
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
        setMensagem("Erro ao carregar turmas.");
      }
    };

    fetchTurmas();
  }, []);

  // Função para adicionar uma nova turma
  const adicionarTurma = async (e) => {
    e.preventDefault();

    if (!novaTurma.trim()) {
      setMensagem("O nome da turma é obrigatório.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/admin/turmas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: novaTurma }),
      });

      const data = await response.json();

      if (response.ok) {
        setTurmas([...turmas, data.turma]);
        setNovaTurma("");
        setMensagem("Turma adicionada com sucesso!");
      } else {
        setMensagem(`Erro: ${data.erro}`);
      }
    } catch (error) {
      console.error("Erro ao adicionar turma:", error);
      setMensagem("Erro ao adicionar turma.");
    }
  };

  // Função para excluir uma turma
  const excluirTurma = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/turmas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTurmas(turmas.filter((turma) => turma.id !== id));
        setMensagem("Turma excluída com sucesso!");
      } else {
        setMensagem("Erro ao excluir turma.");
      }
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
      setMensagem("Erro ao excluir turma.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gerenciar Turmas</h2>
      <form onSubmit={adicionarTurma}>
        <div>
          <label>Nome da Turma:</label>
          <input
            type="text"
            value={novaTurma}
            onChange={(e) => setNovaTurma(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar Turma</button>
      </form>

      {mensagem && <p>{mensagem}</p>}

      <h3>Lista de Turmas:</h3>
      <ul>
        {turmas.map((turma) => (
          <li key={turma.id}>
            {turma.nome}{" "}
            <button onClick={() => excluirTurma(turma.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TurmasPage;
