
const btnSobre = document.querySelector('#sobrenos');
const btnLogout = document.querySelector('#btn_logout');
const concerto = document.querySelector('#os');
const btn_admin = document.querySelector('#btn_adm');

btn_admin.addEventListener('click', () => {
    window.location.replace("../html/adm.html"); 
});


btnSobre.addEventListener('click', () => {
    window.location.replace("../html/sobrenos.html"); 
});
concerto.addEventListener('click', () => {
    window.location.replace("../html/conserto.html");
});


btnLogout.addEventListener('click', () => {
    localStorage.clear();
    alert("Sessão encerrada com sucesso!");

    window.location.replace("../html/login.html"); 
});



 //realizar login
  const nome = document.createElement("p");
  nome.style.fontSize = "18px";
    nome.style.marginRight = "20px";
  const cadastro = document.querySelector("#cadastro");
  cadastro.addEventListener("click", () => {
    window.location.href = "../html/cadastro.html";
  });

  const login = document.querySelector("#login");
  login.addEventListener("click", () => {
    window.location.replace("../html/login.html")
  });

  const h4 = document.querySelector("h4");
  h4.appendChild(nome);

  const nomeUsuario = localStorage.getItem("nome");
  const nivel = localStorage.getItem("nivel");
  
  if (nivel == 1) {
    h4.textContent = `Bem vindo usuário: ${nomeUsuario}`;
    cadastro.remove();
    login.remove();
    btn_admin.remove();
    
  }
  else if (nivel == 3) {
    h4.textContent = `Bem vindo administrador: ${nomeUsuario}`;
    cadastro.remove();
    login.remove();
  }
  else if (nivel == 2) {
    h4.textContent = `Bem vindo Técnico: ${nomeUsuario}`;
    cadastro.remove();
    login.remove();
    btn_admin.remove();
  }
  else {
    nome.textContent = "Bem-vindo, visitante";
    btnLogout.remove();
    btn_admin.remove();
  }
