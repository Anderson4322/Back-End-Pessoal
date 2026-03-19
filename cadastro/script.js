document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const nome = document.querySelector("#nome").value;
  const endereco = document.querySelector("#endereco").value;
<<<<<<< HEAD
  const telefone = document.querySelector("#telefone").value;
  const tipo_de_conta = document.querySelector("#tipoConta").value

  const resposta = await fetch("http://192.168.1.26:3000/cadastro/user", {
=======
  const tipo_de_conta = document.querySelector("#tipoConta").value

  const resposta = await fetch("http://localhost:3000/cadastro/user", {
>>>>>>> 05bb3eb6edbe491b78d777293df3400fab1e6710
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
   nome,
    email,
     senha,
      endereco,
<<<<<<< HEAD
      telefone,
=======
>>>>>>> 05bb3eb6edbe491b78d777293df3400fab1e6710
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