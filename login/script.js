<<<<<<< HEAD
const form = document.querySelector("form")
=======
 //realizar login
 const form = document.querySelector("form")
>>>>>>> 05bb3eb6edbe491b78d777293df3400fab1e6710
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value
    const senha = document.querySelector("#senha").value
<<<<<<< HEAD
    const resposta = await fetch("http://192.168.1.26:3000/usuarios/login", {
=======
    const resposta = await fetch("http://localhost:3000/usuarios/login", {
>>>>>>> 05bb3eb6edbe491b78d777293df3400fab1e6710
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
      localStorage.setItem("id_usuario", usuarios.id_usuario);
      localStorage.setItem("Nome", usuarios.nome);
<<<<<<< HEAD
=======
      localStorage.setItem("tipoconta", usuarios.tipoConta);
>>>>>>> 05bb3eb6edbe491b78d777293df3400fab1e6710
      localStorage.setItem("Gmail", usuarios.email);
      if (usuarios.tipoconta === 'administrativo') {
        return (window.location.href = "../admin/index.html");
      }
      return (window.location.href = "../inicio/index.html");
    } else {
      alert("Usuario ou senha incorretos");
    }
  });