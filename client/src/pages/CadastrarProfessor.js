import React, { useState } from "react";

const CadastrarProfessor = () => {
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Montar os dados do formulário
    const dados = {
      nome,
      usuario,
      senha,
    };

    try {
      // Enviar a requisição ao backend
      const response = await fetch("http://localhost:3000/admin/cadastrar-professor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(`Professor cadastrado com sucesso: ${data.professor.nome}`);
        setNome("");
        setUsuario("");
        setSenha("");
      } else {
        setMensagem(`Erro: ${data.erro}`);
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      setMensagem("Erro ao conectar ao servidor. Tente novamente.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastrar Professor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CadastrarProfessor;
