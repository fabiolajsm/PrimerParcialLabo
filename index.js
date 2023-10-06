class Vehiculo {
  constructor(id, modelo, anoFab, velMax) {
    this.id = id; // Mayor a 0
    this.modelo = modelo; // No vacío
    this.anoFab = anoFab; // Mayor a 1885
    this.velMax = velMax; // Myaor a 0
  }

  toString() {
    return `Modelo: ${this.modelo}. Año Fabricación: ${this.anoFab}. Valocidad Máxima: ${this.velMax}`;
  }
}
class Aereo extends Vehiculo {
  constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
    super(id, modelo, anoFab, velMax);
    this.altMax = altMax; // Mayor a 0
    this.autonomia = autonomia; // Mayor a 0
  }
}

class Terrestre extends Vehiculo {
  constructor(id, modelo, anoFab, velMax, cantPue, catRue) {
    super(id, modelo, anoFab, velMax);
    this.cantPue = cantPue; // Mayor a -1
    this.catRue = catRue; // Mayor a 0
  }
}

let listaElementos = [
  {
    id: 14,
    modelo: "Ferrari F100",
    anoFab: 1998,
    velMax: 400,
    cantPue: 2,
    cantRue: 4,
  },
  {
    id: 51,
    modelo: "Dodge Viper",
    anoFab: 1991,
    velMax: 266,
    cantPue: 2,
    cantRue: 4,
  },
  {
    id: 67,
    modelo: "Boeing CH-47 Chinook",
    anoFab: 1962,
    velMax: 302,
    altMax: 6,
    autonomia: 1200,
  },
  {
    id: 666,
    modelo: "Aprilia RSV 1000 R",
    anoFab: 2004,
    velMax: 280,
    cantPue: 0,
    cantRue: 2,
  },
  {
    id: 872,
    modelo: "Boeing 747-400",
    anoFab: 1989,
    velMax: 988,
    altMax: 13,
    autonomia: 13450,
  },
  {
    id: 742,
    modelo: "Cessna CH-1 SkyhookR",
    anoFab: 1953,
    velMax: 174,
    altMax: 3,
    autonomia: 870,
  },
];
listaElementos = listaElementos.map((elemento) => {
  if (elemento.altMax !== undefined || elemento.autonomia !== undefined) {
    return new Aereo(
      elemento.id,
      elemento.modelo,
      elemento.anoFab,
      elemento.velMax,
      elemento.altMax || 0,
      elemento.autonomia || 0
    );
  } else {
    return new Terrestre(
      elemento.id,
      elemento.modelo,
      elemento.anoFab,
      elemento.velMax,
      elemento.cantPue || 0,
      elemento.catRue || 0
    );
  }
});

function mostrarElementosEnFormDatos(arrayObjetos) {
  const tbody = document.getElementById("elementos");
  tbody.innerHTML = "";

  arrayObjetos.forEach((objeto) => {
    const fila = document.createElement("tr");
    const tdID = document.createElement("td");
    tdID.textContent = objeto.id;
    const tdModelo = document.createElement("td");
    tdModelo.textContent = objeto.modelo;
    const tdAnoFab = document.createElement("td");
    tdAnoFab.textContent = objeto.anoFab;
    const tdVelMax = document.createElement("td");
    tdVelMax.textContent = objeto.velMax;
    const tdAltMax = document.createElement("td");
    tdAltMax.textContent = objeto.altMax || "-";
    const tdAutonomia = document.createElement("td");
    tdAutonomia.textContent = objeto.autonomia || "-";
    const tdCantPue = document.createElement("td");
    tdCantPue.textContent = objeto.cantPue || "-";
    const tdCantRue = document.createElement("td");
    tdCantRue.textContent = objeto.cantRue || "-";
    fila.appendChild(tdID);
    fila.appendChild(tdModelo);
    fila.appendChild(tdAnoFab);
    fila.appendChild(tdVelMax);
    fila.appendChild(tdAltMax);
    fila.appendChild(tdAutonomia);
    fila.appendChild(tdCantPue);
    fila.appendChild(tdCantRue);
    tbody.appendChild(fila);
  });
}

function handleFiltroPorTipo() {
  const filtro = document.getElementById("filtroPorTipo").value;
  let elementosFiltrados = [];

  if (filtro === "Todos") {
    elementosFiltrados = listaElementos;
  } else if (filtro === "Aereo") {
    elementosFiltrados = listaElementos.filter(
      (elemento) => elemento instanceof Aereo
    );
  } else if (filtro === "Terrestre") {
    elementosFiltrados = listaElementos.filter(
      (elemento) => elemento instanceof Terrestre
    );
  }
  mostrarElementosEnFormDatos(elementosFiltrados);
}

function calcularPromedioVelMax() {
  const inputPromedio = document.getElementById("promedioVelMax");
  const filtroPorTipo = document.getElementById("filtroPorTipo").value;

  const elementosFiltrados = listaElementos.filter((elemento) => {
    return (
      filtroPorTipo === "Todos" ||
      (filtroPorTipo === "Terrestre" && elemento instanceof Terrestre) ||
      (filtroPorTipo === "Aereo" && elemento instanceof Aereo)
    );
  });

  const promedio =
    elementosFiltrados.reduce((total, elemento) => {
      return total + elemento.velMax;
    }, 0) / elementosFiltrados.length;
  inputPromedio.value = promedio.toFixed(2);
  inputPromedio.style.fontWeight = 600;
}

mostrarElementosEnFormDatos(listaElementos);

const tablaElementos = document.getElementById("elementos");
tablaElementos.addEventListener("dblclick", mostrarFormABM);
function mostrarFormABM() {
  document.getElementById("contenedorElementos").style.display = "none";
  const formularioABM = document.getElementById("formularioABM");
  formularioABM.style.display = "block";
}
function cerrarFormABM() {
  const formularioABM = document.getElementById("formularioABM");
  formularioABM.style.display = "none";
  document.getElementById("contenedorElementos").style.display = "block";
}
