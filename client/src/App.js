import React, { useState, useEffect } from "react";

function App() {
  const [mensagem, setMensagem] = useState("Carregando..."); // Mensagem inicial enquanto carrega
  const [status, setStatus] = useState(""); // Para exibir o status da conexão

  // Função para testar a conexão com o backend
  useEffect(() => {
    const testarConexao = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        if (response.ok) {
          const data = await response.json();
          if (data.mensagem) {
            setMensagem(data.mensagem);
            setStatus("Conectado com sucesso! ✅");
          } else {
            setMensagem("Erro inesperado ao se conectar com o backend.");
            setStatus("Falha na conexão ❌");
          }
        } else {
          setMensagem("Backend não retornou resposta válida.");
          setStatus("Falha na conexão ❌");
        }
      } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        setMensagem("Não foi possível conectar ao backend.");
        setStatus("Falha na conexão ❌");
      }
    };

    testarConexao();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>Bem-vindo ao App de Agendamento</h1>
      <h3>Desenvolvido por Flávio Carvalho</h3>
      <p><strong>Status do Backend:</strong> {status}</p>
      <p>{mensagem}</p>
    </div>
  );
}

export default App;
