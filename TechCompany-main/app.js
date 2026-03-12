import express from "express";
import cors from "cors";
import sql from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rota para trazer todos os cursos
app.get("/usuarios", async (req, res) => {
  const usuarios = await sql`SELECT * FROM usuarios`;
  return res.status(200).json(usuarios);
});
//Mostrando pedidos
app.get("/pedidos", async (req, res) => {
  const pedidos = await sql`SELECT * FROM pedidos`;
  return res.status(200).json(pedidos);
});

// Rota para detalhes de um curso específico
app.get("/cursos/:id", async (req, res) => {
  const { id } = req.params;

  const curso = await sql`SELECT * FROM cursos WHERE id_curso = ${id}`;
  res.json(curso[0]);

});

// Login de usuário
app.post("/usuarios/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuario =
    await sql`select * from usuarios where email = ${email} and senha = ${senha}`;
  if (usuario[0]) {
    return res.status(200).json(usuario[0]);
  }
  return res.status(401).json("Usuario ou senha incorretos");
});


// Cadastro de usuário/admin
app.post("/admin/cadastro", async (req, res) => {
  const { nome, email, senha, telefone, endereco, nivel, tipoconta } = req.body;
  await sql`insert into usuarios( nome, tipoconta, endereco,email,senha, nivel, telefone) values (${nome}, ${tipoconta}, ${endereco}, ${email}, ${senha}, ${nivel}, ${telefone})`;
  return res.status(200).json("cadastrado");
});

// Cadastro de usuário
app.post("/cadastro/user", async (req, res) => {
  const { nome, email, senha, endereco, tipo_de_conta, telefone } = req.body;
  await sql`insert into usuarios(tipoConta,nome, email, senha,telefone, endereco, nivel) values (${tipo_de_conta},${nome}, ${email}, ${senha}, ${telefone}, ${endereco},1)`;
  return res.status(201).json("cadastrado");

});

// Adicionar novo curso
app.post("/cad_pedidos", async (req, res) => {
  const { nome,
    descricao,
    tipoeletronico,
    modelo,
    telefone,
    valor  } = req.body;
  await sql`INSERT INTO pedidos (nome, descricao_problema, tipoeletronico, modelo, telefone, valor) VALUES (${nome}, ${descricao}, ${tipoeletronico}, ${modelo}, ${telefone}, ${valor})`;
  return res.status(201).json({ alert: "Pedido adicionado com sucesso!" });
});

// Solicitar certificado

app.post("/comprar", async (req, res) => {
  const { nome, curso } = req.body;

  const certificado =
    await sql`insert into certificados (nome, curso, dateCertificado)values (${{ nome }}, ${new Date()}, ${{ curso }}) returning id;`;

  return res.status(201).json("Solicitação de certificado criada com sucesso!");
});

// Deletar produto
app.delete("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sql`delete from usuarios where id_usuario = ${id} `;
    return res.status(200).json("Usuário deletado");
  } catch (error) {
    res.status(409).json("Usuário não pode ser deletado");
  }
});
//deletar pedido
app.delete("/del_pedido/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sql`delete from pedidos where id_pedido = ${id} `;
    return res.status(200).json("Pedido deletado");
  } catch (error) {
    res.status(409).json("Pedido não pode ser deletado");
  }
});

// Alterar Curso

app.put("/alterar/:id", async (req, res) => {

  const { id } = req.params;
  const { nome,
    descricao,
    tipoeletronico,
    modelo,
    telefone,
    valor } = req.body;

  await sql`UPDATE pedidos SET nome=${nome}, descricao_problema=${descricao}, tipoeletronico=${tipoeletronico}, modelo=${modelo}, telefone=${telefone}, valor=${valor} WHERE id_pedido = ${id};`;
  return res.status(201).json("alterado");
});



app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});

