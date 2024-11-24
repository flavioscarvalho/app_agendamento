console.log('admin.js foi carregado com sucesso');

const express = require('express'); // Importa o framework Express
const bcrypt = require('bcrypt'); // Importa o bcrypt para criptografia de senhas
const { criarUsuario } = require('../models/usuarios'); // Importa a função de criação de usuários do modelo

const router = express.Router(); // Cria o roteador do Express

// Rota para cadastrar professor
router.post('/cadastrar-professor', async (req, res) => {
  try {
    const { nome, usuario, senha } = req.body; // Extrai os dados do corpo da requisição

    // Verificar se todos os campos estão presentes
    if (!nome || !usuario || !senha) {
      return res.status(400).json({
        erro: 'Todos os campos (nome, usuario e senha) são obrigatórios.',
      });
    }

    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Criar o professor no banco de dados
    const professor = await criarUsuario(nome, 'professor', usuario, senhaCriptografada);

    // Retornar a resposta de sucesso
    res.status(201).json({
      mensagem: 'Professor cadastrado com sucesso!',
      professor,
    });
  } catch (err) {
    console.error(err); // Loga o erro no servidor

    // Tratamento específico para erros de usuário duplicado
    if (err.code === '23505') {
      return res.status(400).json({ erro: 'Usuário já existe.' });
    }

    // Tratamento genérico para outros erros
    res.status(500).json({ erro: 'Erro ao cadastrar o professor.' });
  }
});

module.exports = router; // Exporta o roteador para ser utilizado no arquivo `app.js`
