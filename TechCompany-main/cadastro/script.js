document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const nome = document.querySelector("#nome").value;
  const endereco = document.querySelector("#endereco").value;
  const telefone = document.querySelector("#telefone").value;
  const tipo_de_conta = document.querySelector("#tipoConta").value

  const resposta = await fetch("http://localhost:3000/cadastro/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
   nome,
    email,
     senha,
      endereco,
      telefone,
       tipo_de_conta
    }),
  });

  if(resposta.status == 201){
    alert("Cadastrado com sucesso")
    (window.location.href = "../login/index.html");
  } else{
    alert("Cadastro invalido! ou Email ja cadastrado")
    return
  } 
});