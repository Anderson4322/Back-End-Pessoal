import express from "express";
import cors from "cors";
import sql from "./database.js";
import { CriarHash, CompararHash } from "./utilits.js";

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

app.get("/pedidos/:id", async (req, res) => {
  const { id } = req.params;

  const curso = await sql`SELECT * FROM pedidos WHERE id_pedido = ${id}`;
}
)
// Login de usuário
app.post("/usuarios/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await sql`select id_usuario,nome,nivel,senha from usuarios where email = ${email}`;

  console.log(usuario[0].senha);
  if (usuario[0].length !== 0) {
    const senhaValida = await CompararHash(senha, usuario[0].senha);
    if (senhaValida) {
      return res.status(200).json({ id_usuario: usuario[0].id_usuario, nome: usuario[0].nome, nivel: usuario[0].nivel });
    }
    return res.status(401).json("Senha incorreta");
  }
  return res.status(401).json("Erro ao cadastrar usuário");
});

// Cadastro de usuário Admin

app.post('/admin/cadastro', async (req, res) => {
  const { nome, email, senha,endereco, nivel} = req.body;

  const hash = await CriarHash(senha, 10)

  await sql`insert into usuarios( nome,endereco,email,senha,nivel) values (${nome}, ${endereco}, ${email}, ${hash}, ${nivel})`;

  if (res.status(200)) {
    return res.status(200).json("Usuário criado com sucesso");
  } else {
    return res.status(500).json("Erro ao cadastrar usuário");
  }
})

app.post('/cadastro/user', async (req, res) => {
  const { nome, email, senha, endereco } = req.body;

  const hash = await CriarHash(senha, 10)

  await sql`insert into usuarios(nome, email, senha, endereco, nivel)values(${nome},${email},${hash},${endereco},1)`;

  if (res.status(201)) {
    return res.status(201).json("Usuário criado com sucesso");
  } else {
    return res.status(500).json("Erro ao cadastrar usuário");
  }
})

app.post("/cad_pedidos", async (req, res) => {
  const { nome,
    tipoeletronico,
    descricao_problema,
    modelo,
    telefone,

  } = req.body;

  await sql`INSERT INTO pedidos (nome, descricao_problema, tipoeletronico, modelo, telefone, valor) VALUES (${nome}, ${descricao_problema}, ${tipoeletronico}, ${modelo}, ${telefone},0)`;
  if (res.status(201)) {
    return res.status(201).json("Pedido criado com sucesso");
  }
  return res.status(500).json("Erro ao criar pedido");
});

// Solicitar certificado


app.put("/comentario/:id", async (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;

  await sql`update pedidos set comentario = ${comentario} where id_pedido = ${id}`;

  return res.status(201).json("comentario adicionado");
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

    await sql`delete from pedidos where id_produtos = ${id} `;


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

  await sql`UPDATE pedidos SET nome=${nome}, descricao=${descricao}, tipoeletronico=${tipoeletronico}, modelo=${modelo}, telefone=${telefone}, valor=${valor} WHERE id_produtos = ${id};`;
  return res.status(201).json("alterado");
});

app.put("/alt_user/:id", async (req, res) => {

  const { id } = req.params;
  const { nome,
    email,
    endereco,
    nivel
  } = req.body;

  await sql`UPDATE usuarios SET nome=${nome}, email=${email}, endereco=${endereco}, nivel=${nivel} WHERE id_usuario = ${id};`;
  return res.status(201).json("alterado");
}
);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});

