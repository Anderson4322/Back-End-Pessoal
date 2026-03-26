
const btnSobre = document.querySelector('#sobrenos');
const btnLogout = document.querySelector('#btn_logout');
const concerto = document.querySelector('#os');


btnSobre.addEventListener('click', () => {
    window.location.replace("../sobrenos/sobrenos.html"); 
});
concerto.addEventListener('click', () => {
    window.location.replace("../conserto/concerto.html");
});


btnLogout.addEventListener('click', () => {
    localStorage.clear();
    alert("Sessão encerrada com sucesso!");

    window.location.replace("../login/index.html"); 
});



 //realizar login
  const nome = document.createElement("p");
  nome.style.fontSize = "18px";
    nome.style.marginRight = "20px";
  const cadastro = document.querySelector("#cadastro");
  cadastro.addEventListener("click", () => {
    window.location.href = "../cadastro/index.html";
  });

  const login = document.querySelector("#login");
  login.addEventListener("click", () => {
    window.location.href = "../login/index.html";
  });

  const h5 = document.querySelector("h5");
  h5.appendChild(nome);

  const nomeUsuario = localStorage.getItem("nome");
  
  if (nomeUsuario) {
    h5.textContent = `Bem vindo usuário: ${nomeUsuario}`;
    cadastro.remove();
    login.remove();
    
  }
  else {
    nome.textContent = "Bem-vindo, visitante";
    btnLogout.remove()
  }