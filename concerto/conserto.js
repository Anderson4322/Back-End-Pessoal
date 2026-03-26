const openButtons = document.querySelector('#abrirMod'); 
const modal = document.querySelector("#modal-1"); 
openButtons.addEventListener("click", () => {  
modal.showModal(); //show ou showModal 
}); 

const closeButtons = document.querySelector('#sair'); 
closeButtons.addEventListener('click', () =>{ 
modal.close(); //fechar modal 
});

//menu hamburguer
const btnMenu = document.getElementById("btn-menu");
const dropdown = document.getElementById("dropdown-menu");

btnMenu.addEventListener("click", () => {
  dropdown.classList.toggle("ativo");
});

/* fechar clicando fora */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-hamburguer")) {
    dropdown.classList.remove("ativo");
  }
});

const btn = document.querySelector("#confirmar");
const input = document.querySelectorAll("input");
const select = document.querySelector("select");
const details = document.querySelector("details");

document.querySelector('form').addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.querySelector("#nome").value;
  const descricao = document.querySelector("#descricao").value;
  const tipoeletronico = document.querySelector("#tipoeletronico").value;
  const modelo = document.querySelector("#modelo").value;
  const telefone = document.querySelector("#telefone").value;
  // const comentario = document.querySelector("#comentario").value;
  console.log(nome, descricao, tipoeletronico, modelo);
 
  const resposta = await fetch("http://localhost:3000/cad_pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify({
        nome,
        descricao,
        tipoeletronico,
        modelo,
        telefone
    }),
  });
  if(resposta.status == 200){
    return window.location.reload();
  }else{
    alert("Erro ao cadastro de pedido")
  }
});



const conteudo = document.querySelector(".grade-posts");

window.addEventListener("load", async () => {
  const resposta = await fetch("http://localhost:3000/pedidos");
  const produto = await resposta.json();

  produto.map((p) => {
console.log(p);
    const card = document.createElement("div");
    card.classList.add("caixa-problema");

    const tipo = document.createElement("p");
    tipo.className = "p2";
    tipo.textContent = p.tipoeletronico;

    const nome = document.createElement("h3");
    nome.className = "p1";
    nome.textContent = p.nome;

    const telefone = document.createElement("h5");
    telefone.textContent = `Número de Contato: ${p.telefone}`;

    const linha = document.createElement("hr");
    linha.style.border = "none";
    linha.style.borderTop = "1px solid #eee";

    const modelo = document.createElement("h4");
    modelo.className = "mod";
    modelo.textContent = `Modelo: ${p.modelo}`;

    const descricao = document.createElement("p");
    descricao.textContent = `Descrição: ${p.descricao}`;

    const valor = document.createElement("h3");
    valor.className = "valor1";
    valor.textContent = `Valor: R$${p.valor}`;

    const comentario = document.createElement("details");

    const comentarioTexto = document.createElement("p");
    comentarioTexto.textContent = `Comentários: ${p.comentario}`;
    const summary = document.createElement("summary");
    summary.textContent = "Comentário";
    comentario.appendChild(summary);
    
    comentario.appendChild(comentarioTexto);
    card.appendChild(tipo);
    card.appendChild(nome);
    card.appendChild(telefone);
    card.appendChild(linha);
    card.appendChild(modelo);
    card.appendChild(descricao);
    card.appendChild(valor);
    card.appendChild(comentario);

    conteudo.appendChild(card);
  });
});

const btnSair = document.querySelector("#btn-sair");
btnSair.addEventListener("click", () => {
  window.location.href = "../Homepage/pagina_inicial.html";
});

const btnCadastrar = document.querySelector("#cadastrar");
btnCadastrar.addEventListener("click", () => {
  window.location.href = "../cadastro/cadastro.html";
});
const btnLogar = document.querySelector("#logar");
btnLogar.addEventListener("click", () => {
  window.location.href = "../login/index.html";
});

const nomeUsuario = localStorage.getItem("nome");
const nivel = localStorage.getItem("nivel");

if (nivel == 2) {
  console.log("Bem vindo Tecnico");
}else{
  comentario.remove();
}
