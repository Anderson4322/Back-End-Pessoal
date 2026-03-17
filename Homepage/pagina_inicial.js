
const btnSobre = document.querySelector('#btn-sobre');
const btnLogout = document.querySelector('#btn-logout');

btnSobre.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "../sobrenos/sobre.html"; 
});


btnLogout.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    alert("Sessão encerrada com sucesso!");

    window.location.href = "../login/index.html"; 
});