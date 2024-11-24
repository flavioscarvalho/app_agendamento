import React, { useState } from "react";

function AdminPage() {
  const [formData, setFormData] = useState({ nome: "", usuario: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/admin/cadastrar-professor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMensagem("Professor cadastrado com sucesso!");
        setFormData({ nome: "", usuario: "", senha: "" });
      } else {
        setMensagem(data.erro || "Erro ao cadastrar professor.");
      }
    } catch (error) {
      setMensagem("Erro ao se conectar ao backend.");
    }
  };

  return (
    <div>
      <h2>Cadastro de Professores</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default AdminPage;
