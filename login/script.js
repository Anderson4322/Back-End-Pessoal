 //realizar login
 const form = document.querySelector("form")
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value
    const senha = document.querySelector("#senha").value
    const resposta = await fetch("http://localhost:3000/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });
  
    if (resposta.status == 200) {
      const usuarios = await resposta.json();
      localStorage.setItem("id", usuarios.id_usuario);
      localStorage.setItem("nome", usuarios.nome);
      localStorage.setItem("nivel", usuarios.nivel);
      if (usuarios.nivel == 3) {
        return (window.location.href = "../admin/index.html");
      }
      return (window.location.href = "../Homepage/pagina_inicial.html");
    } else {
      alert("Usuario ou senha incorretos");
    }
  });