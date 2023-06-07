//https://data.unicef.org/wp-content/uploads/2022/07/SOFI_2022.pdf
//pg 51

let continentes = {
    //importante: esses IDs têm que bater com os IDs da .svg
    //sim esse sistema inteiro é hack mas fazer o que, é pra entregar a GS daqui a 2 dias kkkkk
    "africa": {
        populacao: 1440808985, //fixme: acertar população lol
        txInsegModeradaSevera: 57.9, //lembrar que esse é a soma de moderada *e* severa
        txInsegSevera: 23.4,
        corOn: "#dbdb09",
        corOff: "#7d7d07", //fixme: talvez usar opacidade ao invés disso
    },
    "asia": {
        populacao: 4759485240,
        txInsegModeradaSevera: 24.6,
        txInsegSevera: 10.5,
        corOn: "#22c90c",
        corOff: "#157d07",
    },
    "northAmericaAndEurope": {
        populacao: 375608031+748967658,
        txInsegModeradaSevera: 8.0,
        txInsegSevera: 1.5,
        corOn: "#0d6fde",
        corOff: "#07468f",
    },
    "latinAmerica": {
        populacao: 671408387,
        txInsegModeradaSevera: 40.6,
        txInsegSevera: 14.2,
        corOn: "#990699",
        corOff: "#610461",
    },
    "oceania": {
        populacao: 44332797,
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
        inicializarContinente(continente, idContinente)
        pintarContinente(continente, continentes[idContinente].corOff)
    };
    reacaoClick(docContinentes.getElementById("africa"), "africa")
    atualizarGrafico()
})

function pintarContinente(element, cor) {
    element.style.fill = cor
}

function inicializarContinente(element, id) {
    element.onclick = function () { reacaoClick(element, id) }
    element.style.cursor = "pointer"
    // todo: escalar um pouquinho em hover com esses eventos
    // hover é uma pseudoclasse que não podemos usar com a svg
    // element.onMouseEnter = function () {}
}

function reacaoClick(element, id) {
    //console.log(continentes[id])
    let dataContinente = continentes[id]
    if (!dataContinente.ativo) {
        dataContinente.ativo = true
        element.style.fill = dataContinente.corOn
    }
    else {
        dataContinente.ativo = false
        element.style.fill = dataContinente.corOff
    }
    //console.log(id)
    atualizarGrafico()
}

function atualizarGrafico() {
    let insegSevera = 0
    let insegModerada = 0
    let peso = 0
    for (let id in continentes) {
        if(!continentes[id].ativo) continue
        let pop = continentes[id].populacao
        insegSevera += pop*continentes[id].txInsegSevera
        insegModerada += pop*(continentes[id].txInsegModeradaSevera-continentes[id].txInsegSevera)
        peso += pop
    }

    insegSevera = insegSevera/peso
    insegModerada = insegModerada/peso
    let seguranca = 100 - (insegSevera + insegModerada)
    if(!insegSevera) return
    escreverBarra("Severa", insegSevera)
    escreverBarra("Moderada", insegModerada)
    escreverBarra("Segura", seguranca)
}

function escreverBarra(tipo, numero) {
    let porcentagem = numero.toFixed(2)+"%"
    let barra = document.getElementById("barra"+tipo)
    let texto = document.getElementById("texto"+tipo)
    barra.style.width = porcentagem
    texto.innerText = porcentagem
}