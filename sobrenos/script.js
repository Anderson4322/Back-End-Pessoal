const inicio = document.getElementById('inicio');
const concerto = document.querySelector('#os');

inicio.addEventListener('click', () => {
    window.location.replace("../Homepage/pagina_inicial.html");
});

concerto.addEventListener('click', () => {
    window.location.replace("../concerto/conserto.html");
});

