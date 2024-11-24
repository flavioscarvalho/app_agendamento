import React, { useState, useEffect } from "react";

const DisciplinasPage = () => {
  const [disciplinas, setDisciplinas] = useState([]); // Lista de disciplinas
  const [novaDisciplina, setNovaDisciplina] = useState(""); // Nome da nova disciplina
  const [erro, setErro] = useState(""); // Mensagem de erro
  const [mensagem, setMensagem] = useState(""); // Mensagem de sucesso

  // Função para carregar as disciplinas do backend
  const carregarDisciplinas = async () => {
    try {
      const resposta = await fetch("http://localhost:3002/admin/listar-disciplinas");
      const dados = await resposta.json();

      if (resposta.ok) {
        setDisciplinas(dados.dados); // Acessa "dados" conforme a estrutura do backend
        setErro(""); // Limpa mensagens de erro
      } else {
        setErro(dados.erro || "Erro ao carregar disciplinas.");
      }
    } catch (err) {
      setErro("Erro ao conectar ao backend."); // Mensagem para falha na conexão
    }
  };

  // Carregar as disciplinas ao montar o componente
  useEffect(() => {
    carregarDisciplinas();
  }, []);

  // Função para adicionar uma nova disciplina
  const adicionarDisciplina = async (e) => {
    e.preventDefault();

    if (!novaDisciplina.trim()) {
      setErro("O nome da disciplina é obrigatório.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3002/admin/cadastrar-disciplina", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: novaDisciplina }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem("Disciplina adicionada com sucesso!");
        setNovaDisciplina(""); // Limpa o campo de input
        carregarDisciplinas(); // Atualizar a lista de disciplinas
        setErro(""); // Limpa mensagens de erro
      } else {
        setErro(dados.erro || "Erro ao adicionar disciplina.");
      }
    } catch (err) {
      setErro("Erro ao conectar ao backend."); // Mensagem para falha na conexão
    }
  };

  // Função para excluir uma disciplina
  const excluirDisciplina = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3002/admin/excluir-disciplina/${id}`, {
        method: "DELETE",
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem("Disciplina excluída com sucesso!");
        carregarDisciplinas(); // Atualizar a lista de disciplinas
        setErro(""); // Limpa mensagens de erro
      } else {
        setErro(dados.erro || "Erro ao excluir disciplina.");
      }
    } catch (err) {
      setErro("Erro ao conectar ao backend."); // Mensagem para falha na conexão
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciar Disciplinas</h1>

      {/* Exibir mensagens de erro ou sucesso */}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

      {/* Formulário para adicionar uma nova disciplina */}
      <form onSubmit={adicionarDisciplina} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome da nova disciplina"
          value={novaDisciplina}
          onChange={(e) => setNovaDisciplina(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Adicionar
        </button>
      </form>

      {/* Lista de disciplinas */}
      <h2>Disciplinas Cadastradas</h2>
      {disciplinas.length === 0 ? (
        <p>Nenhuma disciplina cadastrada.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {disciplinas.map((disciplina) => (
            <li
              key={disciplina.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <span>{disciplina.nome}</span>
              <button
                onClick={() => excluirDisciplina(disciplina.id)}
                style={{
                  padding: "5px 10px",
                  fontSize: "14px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisciplinasPage;
