const div_vazia = document.querySelector("#vazia");
window.addEventListener("load", async () => {
  const produto = await fetch("http://localhost:3000/usuarios");
  const usuario = await produto.json();
  
  usuario.map((usuario) => {
    const card = document.createElement("main");
    card.className = "users";
    card.classList.add("users");
    
    const tipoConta = document.createElement("h2")
    tipoConta.textContent = `Tipo de Conta: ${usuario.tipoconta}`;


    const nome = document.createElement("h3")
    nome.textContent = `Nome: ${usuario.nome}`;

    const email = document.createElement("p")
    email.textContent = `Email: ${usuario.email}`;

    const senha = document.createElement("h4")
    senha.textContent = `Senha: ${usuario.senha}`;

    
    
   const excluir = document.createElement("button");
    
 excluir.addEventListener("click", async () => {
      console.log(usuario.id_usuario);
      const resposta = await fetch(
        `http://localhost:3000/deletar/${usuario.id_usuario}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resposta.status == 200) {
        window.location.reload();
        return alert("Curso deletado!");
      } else {
        return alert("Erro ao deletar curso.");
      }
    });

    excluir.textContent = "🗑️";
    excluir.style.width = "5vh";
    excluir.style.height = "5vh";
    excluir.id = "excluir";


    
    
        card.appendChild(tipoConta);
        card.appendChild(nome);
        card.appendChild(email);
        card.appendChild(senha);
        div_vazia.appendChild(card);
    
    card.appendChild(excluir);
  })

})


//mostrando pedidos

const conteudo = document.querySelector("#show_pedido");

window.addEventListener("load", async () => {
  const produto = await fetch("http://localhost:3000/pedidos");
  const usuario = await produto.json();
  
  usuario.map((p) => {
    const card = document.createElement("main");
    card.className = "pedidos";
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


    const editar = document.createElement("button");
    editar.textContent = "✏️";
    editar.style.width = "5vh";
    editar.style.height = "5vh";
    editar.id = "editar";
    
    editar.addEventListener('click', async()=>{
        const nome = prompt("Digite o novo nome do usuário:", p.nome);
        const descricao = prompt("Digite o novo email do usuário:", p.descricao_problema);
        const tipoeletronico = prompt("Digite a nova senha do usuário:", p.tipoeletronico);
        const modelo = prompt("Digite o novo endereço do usuário:", p.modelo);
        const telefone = prompt("Digite o novo telefone do usuário:", p.telefone);
        const valor = prompt("Digite o novo nível do usuário:", p.valor);

        const resposta = await fetch(`http://localhost:3000/alterar/${p.id_pedido}`, {
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

    const excluir = document.createElement("button");
    excluir.textContent = "🗑️";
    excluir.style.width = "5vh";
    excluir.style.height = "5vh";
    excluir.id = "excluir";

    excluir.addEventListener('click', async()=>{
        const resposta = await fetch(`http://localhost:3000/del_pedido/${p.id_pedido}`, {
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

botao_sair.addEventListener("click", () => {
  localStorage.removeItem("id_usuario");
  localStorage.removeItem("Nome");
  localStorage.removeItem("Gmail");
  window.location.href = "../login/index.html";
});

//cadastro de usuário

document.querySelector("form").addEventListener('submit', async(e)=>{
  e.preventDefault();
  const nome = document.querySelector("#nome").value;
  const tipoconta = document.querySelector("#tipoConta").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const endereco = document.querySelector("#endereco").value;
  const telefone = document.querySelector("#telefone").value;
  const nivel = document.querySelector("#nivel").value;

  const resposta = await fetch("http://localhost:3000/admin/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },  
    body: JSON.stringify({
      nome,
      tipoconta,
      email,
      senha,
      endereco,
      telefone,
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

