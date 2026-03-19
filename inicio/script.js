
const openModalButton = document.querySelector("#openModal");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");

openModalButton.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

//mostrar conteudo
const conteudo = document.querySelector("#vazia");

window.addEventListener("load", async () => {
  const produto = await fetch("http://localhost:3000/pedidos");
  const usuario = await produto.json();
  
  usuario.map((p) => {
    const card = document.createElement("main");
    card.classList.add("pedidos");

   if(usuario.length === 0){
    const vazio = document.createElement("h1");
    vazio.textContent = "Nenhum pedido encontrado!";
    conteudo.appendChild(vazio);
   }

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

      const comentario_texto = document.createElement("p")
    comentario_texto.textContent = `${p.nome}: ${p.comentario}`
    
    const comentario = document.createElement("details");
    
    const input_comentario = document.createElement("input");
    input_comentario.placeholder = "Deixe um comentário sobre o serviço";
    input_comentario.required = true;
    input_comentario.id = "comentario";
    
    const comentario_summary = document.createElement("summary");
    comentario_summary.textContent = "Comentários";
    
    const formulario_comentario = document.createElement("form");
  formulario_comentario.id = "form_comentario";
    
    const enviarComentario = document.createElement("button");
    enviarComentario.textContent = "Enviar Comentário";
    enviarComentario.style.marginTop = "10px";

    enviarComentario.addEventListener('click', async()=>{
     const comentario = document.querySelector('#comentario').value;
    const resposta = await fetch(`http://localhost:3000/comentario/${p.id_pedido}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comentario,
        })
      })
      if(resposta.status === 201){
        alert('Comentário adicionado com sucesso!');
        window.location.reload();
      } else {
       return alert('Erro ao adicionar comentário!');
      }
    })
    
  
    
    card.appendChild(nome);
    card.appendChild(descricao);
    card.appendChild(tipo_eletronico);
    card.appendChild(modelo);
    card.appendChild(numero_contato);
    card.appendChild(valor);
    comentario.appendChild(comentario_texto);
    comentario.appendChild(input_comentario);
    comentario.appendChild(enviarComentario);
    comentario.appendChild(comentario_summary);
    formulario_comentario.appendChild(comentario);
    card.appendChild(formulario_comentario);
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
  
});




document.querySelector('form').addEventListener('submit', async(e)=>{
  e.preventDefault();

  const nome = document.querySelector("#nome");
  const descricao_problema = document.querySelector('#descricao').value
  const tipoeletronico = document.querySelector('#tipoeletronico').value
  const modelo = document.querySelector('#modelo').value
  const telefone = document.querySelector('#telefone').value
  


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
      telefone
    })
  });
  if(resposta.status === 201){
    alert('Pedido adicionado com sucesso!');
    window.location.reload();
  } else {
   return alert('Erro ao adicionar pedido!');
  }
});

 //realizar login
  const nome = document.createElement("p");
  const cadastro = document.querySelector("#cadastro");
  const login = document.querySelector("#login");
  const h2 = document.querySelector("h2");
  const botao_sair = document.querySelector("#sair");
  h2.appendChild(nome);

  const nomeUsuario = localStorage.getItem("nome");

  
  if (nomeUsuario) {
    h2.textContent = `${nomeUsuario}`;
    cadastro.remove();
    login.remove();
  }
  else {
    nome.textContent = "Bem-vindo, visitante";
    sair.remove()
  }
  //sair
  
  
botao_sair.addEventListener("click", () => {
  localStorage.clear();
  // localStorage.removeItem("id_usuario");
  // localStorage.removeItem("nome");
  // localStorage.removeItem("gmail");
  // localStorage.removeItem("tipoconta");
  window.location.href = "../login/index.html";
});
