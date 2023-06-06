//https://data.unicef.org/wp-content/uploads/2022/07/SOFI_2022.pdf
//pg 51

let continentes = {
    //importante: esses IDs têm que bater com os IDs da .svg
    //sim esse sistema inteiro é hack mas fazer o que, é pra entregar a GS daqui a 2 dias kkkkk
    "africa": {
        populacao: 10000, //fixme: acertar população lol
        txInsegModeradaSevera: 57.9, //lembrar que esse é a soma de moderada *e* severa
        txInsegSevera: 23.4,
        corOn: "#dbdb09",
        corOff: "#7d7d07", //fixme: talvez usar opacidade ao invés disso
    },
    "asia": {
        populacao: 100000,
        txInsegModeradaSevera: 24.6,
        txInsegSevera: 10.5,
        corOn: "#22c90c",
        corOff: "#157d07",
    },
    "northAmericaAndEurope": {
        populacao: 50000,
        txInsegModeradaSevera: 8.0,
        txInsegSevera: 1.5,
        corOn: "#0d6fde",
        corOff: "#07468f",
    },
    "latinAmerica": {
        populacao: 30000,
        txInsegModeradaSevera: 40.6,
        txInsegSevera: 14.2,
        corOn: "#990699",
        corOff: "#610461",
    },
    "oceania": {
        populacao: 15000,
        txInsegModeradaSevera: 13.0,
        txInsegSevera: 4.5,
        corOn: "#d12d0d",
        corOff: "#631708",
    },
}

window.addEventListener('load', function () {
    /*
    Importar uma .svg em uma tag <object> nos dá um outro document defininido
    todos os traços da .svg, que podemos manipular completamente ao vivo no javascript

    Eu tive que agrupar os traços manualmente em um editor externo, mas isso vai
    me dar controle total do mapa mundi para pintar e registrar `onClick`s
    individualmente para cada continente como eu quiser
    */

    // docContinentes é a .svg, mas é um objeto document então preferi o nome
    let docContinentes = this.document.getElementById("continentes").contentDocument
    for (let idContinente in continentes) {
        let continente = docContinentes.getElementById(idContinente)
        pintarContinente(continente, continentes[idContinente].corOff)
        registrarOnClick(continente, idContinente)
    };
})

function pintarContinente(element, cor) {
    // docContinente.querySelectorAll("path").forEach(elemento => {
    //     elemento.style.fill = cor
    // });
    element.style.fill = cor
}

function registrarOnClick(element, id) {
    element.onclick = function () { reacaoClick(element, id) }
}

function reacaoClick(element, id) {
    console.log(continentes[id])
    let dataContinente = continentes[id]
    if (!dataContinente.ativo) {
        dataContinente.ativo = true
        element.style.fill = dataContinente.corOn
    }
    else {
        dataContinente.ativo = false
        element.style.fill = dataContinente.corOff
    }
    console.log(id)
    atualizarGrafico()
}

function atualizarGrafico() {
    // aaaaaaaaaaaaaaaaaaaaaaaaaaaa tem o grafico tambem ne
}