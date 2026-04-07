const voltar = document.querySelector('#sair');
const ordens = document.querySelector('#os');

voltar.addEventListener('click', () => {
    window.location.href = "../html/pagina_inicial.html"
});

ordens.addEventListener('click', () => {
    window.location.href = "../html/conserto.html"
});


