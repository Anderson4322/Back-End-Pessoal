 //realizar login
  const nome = document.createElement("p");
  const h2 = document.querySelector("h1");
  h2.appendChild(nome);

const nomeUsuario = localStorage.getItem("Nome");

if (nomeUsuario) {
  nome.textContent = `${nomeUsuario}`;
} else {
  nome.textContent = "Bem-vindo, visitante";
  sair.remove()
}
//sair
const botao_sair = document.querySelector("#sair");

botao_sair.addEventListener("click", () => {
  localStorage.removeItem("id_usuario");
  localStorage.removeItem("nome");
  localStorage.removeItem("gmail");
  window.location.href = "../login/index.html";
});

//mostrar conteudo

const conteudo = document.querySelector("#vazia");

window.addEventListener("load", async () => {
  const produto = await fetch("http://localhost:3000/pedidos");
  const usuario = await produto.json();
  
  usuario.map((p) => {
    const card = document.createElement("main");
    card.classList.add("pedidos");

    
   
    const nome = document.createElement("h3")
    nome.textContent = `Nome: ${p.nome}`;
    
    const descricao = document.createElement("h2")
    descricao.textContent = `Descrição: ${p.descricao_problema}`;

    const tipo_eletronico = document.createElement("p")
    tipo_eletronico.textContent = `Tipo de Eletrônico: ${p.tipoeletronico}`;

    const modelo = document.createElement("p")
    modelo.textContent = `Modelo: ${p.modelo}`;

    const numero_contato = document.createElement("p")
    numero_contato.textContent = `Número de Contato: ${p.telefone}`;

    const valor = document.createElement("p")
    valor.textContent = `Valor: R$${p.valor}`;


    card.appendChild(nome);
    card.appendChild(descricao);
    card.appendChild(tipo_eletronico);
    card.appendChild(modelo);
    card.appendChild(numero_contato);
    card.appendChild(valor);
    conteudo.appendChild(card);
  })

  // usuario.forEach(element => {
  //  card.innerHTML = `
  //  <h2>Tipo de Conta: ${element.tipoconta}</h2>
  //   <h3>Nome:${element.nome}</h3>
  //   <p>Email: ${element.email}</p>
  //   <p>${element.senha}</p>
  //   `
  // });
})

document.querySelector('form').addEventListener('submit', async(e)=>{
  e.preventDefault();

  const nome = document.querySelector('#nome').value;
  const descricao_problema = document.querySelector('#descricao').value;
  const tipoeletronico = document.querySelector('#tipoeletronico').value;
  const modelo = document.querySelector('#modelo').value;
  const telefone = document.querySelector('#telefone').value;
  const valor = document.querySelector('#valor').value;

  const resposta = await fetch('http://localhost:3000/cad_pedidos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome,
      descricao_problema,
      tipoeletronico,
      modelo,
      telefone,
      valor
    })
  });
  if(resposta.status === 201){
    alert('Pedido adicionado com sucesso!');
    window.location.reload();
  } else {
   return alert('Erro ao adicionar pedido!');
  }
});
