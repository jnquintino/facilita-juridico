// api/index.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { calcularRota } = require('./utils');
const cors = require('cors');

const app = express();
const port = 3001; // ajuste a porta conforme necessário

// Configuração do PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'facilita',
  password: 'postgres',
  port: 5432,
});

// CORS
app.use(cors());
// Middleware para análise do corpo da requisição (para trabalhar com JSON)
app.use(bodyParser.json());

// Rota para listar clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cliente');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para cadastrar clientes
app.post('/api/clientes', async (req, res) => {
  const { nome, email, telefone, coordX, coordY } = req.body;

  try {
    await pool.query(
      'INSERT INTO cliente (nome, email, telefone, coordX, coordY) VALUES ($1, $2, $3, $4, $5)',
      [nome, email, telefone, coordX, coordY]
    );

    res.status(201).send('Cliente cadastrado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para calcular a rota otimizada
app.get('/api/rota', async (req, res) => {
  try {
    const clientes = await pool.query('SELECT * FROM cliente');
    const rotaOtimizada = calcularRota(clientes);

    res.json(rotaOtimizada);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

