//selecionando elementos do DOM
const openModal = document.querySelector("#openModal");
const closeModal = document.querySelector("#closeModal");
const modal = document.querySelector("#modal");

//abrindo e fechando modal
openModal.addEventListener("click", () => {
  modal.showModal();
});
closeModal.addEventListener("click", () => {
  modal.close();
});

//mostrando usuários
const div_vazia = document.querySelector("#vazia");
window.addEventListener("load", async () => {
  const produto = await fetch(`${api}usuarios`);
  const usuario = await produto.json();
  
  usuario.map((usuario) => {
    const card = document.createElement("main");
    card.className = "users";
    card.classList.add("users");
    
    const nivel = document.createElement("h2")
    nivel.textContent = `Nivel da conta: ${usuario.nivel}`;


    const nome = document.createElement("h3")
    nome.textContent = `Nome: ${usuario.nome}`;

    const email = document.createElement("p")
    email.textContent = `Email: ${usuario.email}`;
    
    
   const excluir = document.createElement("button");

    //deletar usuário
 excluir.addEventListener("click", async () => {
      console.log(usuario.id_usuario);
      const resposta = await fetch(`${api}deletar_user/${usuario.id_usuario}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resposta.status == 200) {
        window.location.reload();
        return alert("Usuario deletado!");
      } 
        else {
          return alert("Erro ao deletar usuário!");
        }
    });

    excluir.textContent = "🗑️";
    excluir.style.width = "5vh";
    excluir.style.height = "5vh";
    excluir.id = "excluir_user";


        const editar_user = document.createElement("button");
    editar_user.textContent = "✏️";
    editar_user.style.width = "5vh";
    editar_user.style.height = "5vh";
    editar_user.id = "editar_user";


    //editando de usuário
        editar_user.addEventListener('click', async()=>{
        const nome = prompt("Digite o novo nome do usuário:", usuario.nome);
        const email = prompt("Digite o novo email do usuário:", usuario.email);
        const endereco = prompt("Digite o novo endereço do usuário:", usuario.endereco);
        const nivel = prompt("Digite o novo nível do usuário:", usuario.nivel);

        const resposta = await fetch(`${api}alt_user/${usuario.id_usuario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                email,
                nivel,
                endereco,

                
            })
        
        })
        if(resposta.status === 201){
            alert("Usuario alterado com sucesso!");
            window.location.reload();
        } else{
            return alert("Erro ao alterar usuario!");
        }
  
    })
    
    
    card.appendChild(nivel);
    card.appendChild(nome);
    card.appendChild(email);
    div_vazia.appendChild(card);
    card.appendChild(editar_user);
    card.appendChild(excluir);
  })
  
})


//mostrando pedidos

const conteudo = document.querySelector("#show_pedido");

//criando cards para mostrar os pedidos
window.addEventListener("load", async () => {
  const produto = await fetch(`${api}pedidos`);
  const usuario = await produto.json();

  usuario.map((p) => {
    const card = document.createElement("main");
    card.className = "pedidos";
    card.classList.add("pedidos");

   
    const nome = document.createElement("h3")
    nome.textContent = `Nome: ${p.nome}`;
    nome.style.fontSize = "24px";
    
    const descricao = document.createElement("h2")
    descricao.textContent = `Descrição: ${p.descricao}`;
    descricao.style.fontSize = "15px";
    descricao.style.marginBottom = "5px";
    descricao.style.marginTop = "5px";

    const tipo_eletronico = document.createElement("p")
    tipo_eletronico.textContent = `Tipo de Eletrônico: ${p.tipoeletronico}`;
    tipo_eletronico.style.marginBottom = "4px";
    tipo_eletronico.style.fontWeight = "bold";

    const modelo = document.createElement("p")
    modelo.style.marginBottom = "4px";
    modelo.style.marginTop = "4px";
    modelo.style.fontWeight = "bold";
    modelo.textContent = `Modelo: ${p.modelo}`;

    const numero_contato = document.createElement("p")
    numero_contato.style.marginTop = "4px";
    numero_contato.style.fontWeight = "bold";  
    numero_contato.textContent = `Número de Contato: ${p.telefone}`;

    const valor = document.createElement("p")
    valor.style.color = "green";
    valor.style.marginTop = "10px";
    valor.style.fontWeight = "bold";
    valor.textContent = `Valor: R$${p.valor}`;

//criando botões de editar e excluir pedido
    const editar = document.createElement("button");
    editar.textContent = "✏️";
    editar.style.width = "5vh";
    editar.style.height = "5vh";
    editar.id = "editar";


    //editando pedido
    editar.addEventListener('click', async()=>{
        const nome = prompt("Digite o novo nome do usuário:", p.nome);
        const descricao = prompt("Digite o novo email do usuário:", p.descricao);
        const tipoeletronico = prompt("Digite a nova senha do usuário:", p.tipoeletronico);
        const modelo = prompt("Digite o novo endereço do usuário:", p.modelo);
        const telefone = prompt("Digite o novo telefone do usuário:", p.telefone);
        const valor = prompt("Digite o novo nível do usuário:", p.valor);

        const resposta = await fetch(`${api}alterar/${p.id_produtos}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                descricao,
                tipoeletronico,
                modelo,
                telefone,
                valor
            })
        
        })
        if(resposta.status === 201){
            alert("Pedido alterado com sucesso!");
            window.location.reload();
        } else{
            return alert("Erro ao alterar pedido!");
        }
    })

//deletar pedido
    const excluir = document.createElement("button");
    excluir.textContent = "❌";
    excluir.style.width = "5vh";
    excluir.style.height = "5vh";
    
    excluir.id = "excluir_pedido";

    excluir.addEventListener('click', async()=>{
        const resposta = await fetch(`${api}deletar_pedido/${p.id_produtos}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json"            }
        })
        if(resposta.status === 200){
            alert("Pedido deletado com sucesso!");
            window.location.reload();
        }
        else{
            return alert("Erro ao deletar pedido!");
        }
    })


    card.appendChild(nome);
    card.appendChild(descricao);
    card.appendChild(tipo_eletronico);
    card.appendChild(modelo);
    card.appendChild(numero_contato);
    card.appendChild(valor);
    card.appendChild(editar);
    card.appendChild(excluir);
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

const botao_sair = document.querySelector("#sair");

//mostrando nome do usuário logado
const nome = document.createElement("p");
const h2 = document.querySelector("h2");
h2.appendChild(nome);

const nomeUsuario = localStorage.getItem("nome");


if (nomeUsuario) {
  nome.textContent = `Bem vindo administrador: ${nomeUsuario}`;
}
else {
  nome.textContent = "Bem-vindo, Admin!";
  sair.remove()
}
//sair

botao_sair.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("../html/login.html")
});

//cadastro de usuário

document.querySelector("form").addEventListener('submit', async(e)=>{
  e.preventDefault();
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const endereco = document.querySelector("#endereco").value;
  const nivel = document.querySelector("#nivel").value;

  const resposta = await fetch(`${api}admin/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },  
    body: JSON.stringify({
      nome,
      email,
      senha,
      endereco,
      nivel
    })
  })
  if(resposta.status === 200){
    alert("Usuário criado com sucesso!");
    window.location.reload();
  } else{
    return alert("Erro ao criar usuário!");
  }
})

const home = document.querySelector("#inicio");
home.addEventListener("click", () => {
  window.location.replace("../html/pagina_inicial.html");
})

