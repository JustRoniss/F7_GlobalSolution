//https://data.unicef.org/wp-content/uploads/2022/07/SOFI_2022.pdf
//pg 51

let continentes = {
  //importante: esses IDs têm que bater com os IDs da .svg
  //sim esse sistema inteiro é hack mas fazer o que, é pra entregar a GS daqui a 2 dias kkkkk
  africa: {
    populacao: 1440808985, //fixme: acertar população lol
    txInsegModeradaSevera: 57.9, //lembrar que esse é a soma de moderada *e* severa
    txInsegSevera: 23.4,
    corOn: "#dbdb09",
    corOff: "#7d7d07", //fixme: talvez usar opacidade ao invés disso
  },
  asia: {
    populacao: 4759485240,
    txInsegModeradaSevera: 24.6,
    txInsegSevera: 10.5,
    corOn: "#22c90c",
    corOff: "#157d07",
  },
  northAmericaAndEurope: {
    populacao: 375608031 + 748967658,
    txInsegModeradaSevera: 8.0,
    txInsegSevera: 1.5,
    corOn: "#0d6fde",
    corOff: "#07468f",
  },
  latinAmerica: {
    populacao: 671408387,
    txInsegModeradaSevera: 40.6,
    txInsegSevera: 14.2,
    corOn: "#990699",
    corOff: "#610461",
  },
  oceania: {
    populacao: 44332797,
    txInsegModeradaSevera: 13.0,
    txInsegSevera: 4.5,
    corOn: "#d12d0d",
    corOff: "#631708",
  },
};

window.addEventListener("load", function () {
  /*
    Importar uma .svg em uma tag <object> nos dá um outro document defininido
    todos os traços da .svg, que podemos manipular completamente ao vivo no javascript

    Eu tive que agrupar os traços manualmente em um editor externo, mas isso vai
    me dar controle total do mapa mundi para pintar e registrar `onClick`s
    individualmente para cada continente como eu quiser
    */

  // docContinentes é a .svg, mas é um objeto document então preferi o nome
  let docContinentes =
    this.document.getElementById("continentes").contentDocument;
  for (let idContinente in continentes) {
    let continente = docContinentes.getElementById(idContinente);
    inicializarContinente(continente, idContinente);
    continente.style.fill = continentes[idContinente].corOff;
  }
  //deixar o continente da África já ativo
  reacaoClick(docContinentes.getElementById("africa"), "africa");
});

function pintarContinente(element, cor) {}

function inicializarContinente(element, id) {
  element.onclick = function () {
    reacaoClick(element, id);
  };
  element.style.cursor = "pointer";
  // `transform: scale` não funciona bem com esses elementos dentro da .svg;
  // eles escalam a partir da origem da imagem ao invés de a partir deles mesmos
  // mas esse efeito aqui já funciona legal
  element.onmouseenter = function () {
    element.setAttribute("filter", "drop-shadow(8px 8px 10px)");
  };
  element.onmouseleave = function () {
    element.setAttribute("filter", "drop-shadow(0px 0px 0px)");
  };
}

function reacaoClick(element, id) {
  //console.log(continentes[id])
  let dataContinente = continentes[id];
  if (!dataContinente.ativo) {
    dataContinente.ativo = true;
    element.style.fill = dataContinente.corOn;
  } else {
    dataContinente.ativo = false;
    element.style.fill = dataContinente.corOff;
  }
  //console.log(id)
  atualizarGrafico();
}

function atualizarGrafico() {
  let qtdInsegSevera = 0;
  let qtdInsegModerada = 0;
  let popTotal = 0;
  for (let id in continentes) {
    if (!continentes[id].ativo) continue;
    let pop = continentes[id].populacao;
    qtdInsegSevera += pop * (continentes[id].txInsegSevera / 100);
    qtdInsegModerada += pop * (continentes[id].txInsegModeradaSevera / 100);
    popTotal += pop;
  }
  if (!popTotal) return;

  /*
    console.log("Pop: "+popTotal)
    console.log("qtdInsegSevera: "+qtdInsegSevera)
    console.log("qtdInsegModerada: "+qtdInsegModerada)
  */

  // A progressbar-stacked é complicada:
  // se escrever uma barra de 20%, e depois uma segunda de 15%,
  // elas vão se empurrar e a segunda vai estar visualmente em 35%
  // não só isso como a taxa de insegurança moderada inclui a severa dentro dela
  // por isso essa maçaroca aqui pra levar tudo isso em conta
  let widthFill = (qtdInsegSevera / popTotal) * 100;
  escreverBarra("Severa", qtdInsegSevera, widthFill);
  widthFill = (qtdInsegModerada / popTotal) * 100 - widthFill;
  escreverBarra("Moderada", qtdInsegModerada - qtdInsegSevera, widthFill);
  widthFill = 100 - widthFill;
  escreverBarra("Segura", popTotal - qtdInsegModerada, widthFill);
}

function escreverBarra(tipo, numero, taxa) {
  let barra = document.getElementById("barra" + tipo);
  let texto = document.getElementById("texto" + tipo);
  console.log("width: " + taxa.toFixed(2) + "%");
  barra.style.width = taxa.toFixed(2) + "%";
  texto.innerText = `${(numero / 10 ** 6).toFixed(2)}mi / ${taxa.toFixed(2)}%`;
}
