const voltar = document.querySelector('#sair');
const ordens = document.querySelector('#os');

voltar.addEventListener('click', () => {
    window.location.href = "../Homepage/pagina_inicial.html"
});

ordens.addEventListener('click', () => {
    window.location.href = "../concerto/conserto.html"
});


