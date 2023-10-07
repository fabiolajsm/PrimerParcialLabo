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

class Elemento {
  constructor(id, modelo, anoFab, velMax, altMax, autonomia, cantPue, cantRue) {
    this.id = id;
    this.modelo = modelo;
    this.anoFab = anoFab;
    this.velMax = velMax;
    this.altMax = altMax;
    this.autonomia = autonomia;
    this.cantPue = cantPue;
    this.cantRue = cantRue;
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

/**d) mostrar el “Formulario ABM”
 * con los datos de la fila o vacío según
 * corresponda (ocultar los botones que correspondan). */
// Agrega eventos de doble clic a las filas de la tabla
const tablaElementos = document.getElementById("elementos");
tablaElementos.addEventListener("dblclick", mostrarFormularioABM);
const btnAgregarElemento = document.getElementById("btnAgregarElemento");
btnAgregarElemento.addEventListener("click", mostrarFormularioABMVacio);

function mostrarFormularioABM(event) {
  if (event.target.tagName !== "TD") {
    return;
  }
  const fila = event.target.parentNode;
  const id = fila.children[0].textContent;
  const modelo = fila.children[1].textContent;
  const anoFab = fila.children[2].textContent;
  const velMax = fila.children[3].textContent;
  const altMax = fila.children[4].textContent;
  const autonomia = fila.children[5].textContent;
  const cantPue = fila.children[6].textContent;
  const cantRue = fila.children[7].textContent;

  mostrarFormularioABM(
    id,
    modelo,
    anoFab,
    velMax,
    altMax,
    autonomia,
    cantPue,
    cantRue
  );
}

function mostrarFormularioABMVacio() {
  mostrarFormularioABM("", "", "", "", "", "", "", "");
}

function mostrarFormularioABM(
  id,
  modelo,
  anoFab,
  velMax,
  altMax,
  autonomia,
  cantPue,
  cantRue
) {
  const contenedorElementos = document.getElementById("contenedorElementos");
  contenedorElementos.style.display = "none";
  const formularioABM = document.getElementById("formularioABM");
  formularioABM.style.display = "block";

  document.getElementById("id").value = id;
  document.getElementById("modelo").value = modelo;
  document.getElementById("anoFab").value = anoFab;
  document.getElementById("velMax").value = velMax;
  document.getElementById("altMax").value = altMax;
  document.getElementById("autonomia").value = autonomia;
  document.getElementById("cantPue").value = cantPue;
  document.getElementById("cantRue").value = cantRue;

  const btnAgregarABM = document.getElementById("btnAgregarABM");
  const btnModificarABM = document.getElementById("btnModificarABM");
  const btnEliminarABM = document.getElementById("btnEliminarABM");
  if (id === "") {
    btnAgregarABM.style.display = "block";
    btnModificarABM.style.display = "none";
    btnEliminarABM.style.display = "none";
  } else {
    btnAgregarABM.style.display = "none";
    btnModificarABM.style.display = "block";
    btnEliminarABM.style.display = "block";
  }
}

function cerrarFormABM() {
  const formularioABM = document.getElementById("formularioABM");
  formularioABM.style.display = "none";
  const contenedorElementos = document.getElementById("contenedorElementos");
  contenedorElementos.style.display = "block";
}

function generarID() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}${random}`;
}

function handleMostrarPorTipo() {
  const tipo = document.getElementById("tipo").value;
  const altMaxField = document.getElementById("altMax");
  const autonomiaField = document.getElementById("autonomia");
  const cantPueField = document.getElementById("cantRue");
  const cantRueField = document.getElementById("cantRue");
  const altLabel = document.querySelector('label[for="altMax"]');
  const autLabel = document.querySelector('label[for="autonomia"]');
  const cantPueLabel = document.querySelector('label[for="cantRue"]');
  const cantRueLabel = document.querySelector('label[for="cantRue"]');
  altLabel.style.display = "none";
  autLabel.style.display = "none";
  cantPueLabel.style.display = "none";
  cantRueLabel.style.display = "none";

  altMaxField.style.display = "none";
  autonomiaField.style.display = "none";
  cantPueField.style.display = "none";
  cantRueField.style.display = "none";
  if (tipo === "Aereo") {
    altLabel.style.display = "block";
    autLabel.style.display = "block";
    altMaxField.style.display = "block";
    autonomiaField.style.display = "block";
  } else if (tipo === "Terrestre") {
    cantPueLabel.style.display = "block";
    cantRueLabel.style.display = "block";
    cantPueField.style.display = "block";
    cantRueField.style.display = "block";
  }
}

function agregarElemento() {
  if (validarCampos()) {
    const id = generarID();
    const modelo = document.getElementById("modelo").value;
    const anoFab = document.getElementById("anoFab").value;
    const velMax = document.getElementById("velMax").value;
    const altMax = document.getElementById("altMax").value;
    const autonomia = document.getElementById("autonomia").value;
    const cantPue = document.getElementById("cantPue").value;
    const cantRue = document.getElementById("cantRue").value;
    const nuevoElemento = null;
    if (altMax) {
      nuevoElemento = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
    } else {
      nuevoElemento = new Terrestre(
        id,
        modelo,
        anoFab,
        velMax,
        cantPue,
        cantRue
      );
    }

    if (nuevoElemento != null) {
      listaElementos.push(nuevoElemento);
    }
    actualizarFormDatos();
  }
}
function validarCampos() {
  let esValido = true;
  const tipo = document.getElementById("tipo").value;
  const cantPue = document.getElementById("cantPue").value;
  const cantRue = document.getElementById("cantRue").value;
  const errorTipo = document.querySelector('label[for="errorTipo"]');
  const errorPue = document.querySelector('label[for="errorCantPue"]');
  const errorRue = document.querySelector('label[for="errorCantRue"]');
  //Aereo
  const altMax = document.getElementById("altMax").value;
  const errorAltMax = document.getElementById("errorAltMax").value;

  const autonomia = document.getElementById("autonomia").value;
  const errorAutonomia = document.querySelector('label[for="errorAutonomia"]');

  errorTipo.style.display = "none";
  errorRue.style.display = "none";
  errorPue.style.display = "none";
  errorAltMax.style.display = "none";
  errorAutonomia.style.display = "none";

  if (tipo !== "Terrestre" || tipo !== "Aereo") {
    errorTipo.style.display = "block";
  }
  if (tipo === "Terrestre") {
    if (isNaN(cantRue) || cantRue < -1) {
      errorRue.style.display = "block";
      esValido = false;
    }
    if (isNaN(cantPue) || cantPue < 0) {
      errorPue.style.display = "block";
      esValido = false;
    }
  }
  if (tipo === "Aereo") {
    if (isNaN(altMax) || altMax < 1) {
      errorAltMax.style.display = "block";
      esValido = false;
    }
    if (isNaN(autonomia) || autonomia < 1) {
      errorAutonomia.style.display = "block";
      esValido = false;
    }
  }
  return esValido;
}

function mostrarInputsTipo() {
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const edadInput = document.getElementById("edad");

  idInput.value = elemento.id;
  nombreInput.value = elemento.nombre || "";
  apellidoInput.value = elemento.apellido || "";
  edadInput.value = elemento.edad || "";

  const camposAMostrar =
    elemento instanceof Cliente
      ? ["compras", "telefono"]
      : ["sueldo", "ventas"];
  const camposAOcultar =
    elemento instanceof Cliente
      ? ["sueldo", "ventas"]
      : ["compras", "telefono"];

  camposAMostrar.forEach((campo) => {
    const label = document.querySelector(`label[for="${campo}"]`);
    const input = document.getElementById(campo);
    label.style.display = "block";
    input.style.display = "block";
    input.setAttribute(
      "required",
      tipoAccion === "Modificar" ? "required" : null
    );
    input.value = elemento[campo] || "";
    input.disabled = tipoAccion === "Eliminar";
  });

  camposAOcultar.forEach((campo) => {
    const label = document.querySelector(`label[for="${campo}"]`);
    const input = document.getElementById(campo);
    label.style.display = "none";
    input.style.display = "none";
    input.value = "";
    input.disabled = tipoAccion === "Eliminar";
  });
}

function modificarElemento() {
  const id = document.getElementById("id").value;
  const modelo = document.getElementById("modelo").value;
  const anoFab = document.getElementById("anoFab").value;
  const velMax = document.getElementById("velMax").value;
  const altMax = document.getElementById("altMax").value;
  const autonomia = document.getElementById("autonomia").value;
  const cantPue = document.getElementById("cantPue").value;
  const cantRue = document.getElementById("cantRue").value;

  // Busca el elemento correspondiente en la lista y actualiza sus propiedades
  const elementoExistente = listaElementos.find(
    (elemento) => elemento.id === id
  );
  if (elementoExistente) {
    elementoExistente.modelo = modelo;
    elementoExistente.anoFab = anoFab;
    elementoExistente.velMax = velMax;
    elementoExistente.altMax = altMax;
    elementoExistente.autonomia = autonomia;
    elementoExistente.cantPue = cantPue;
    elementoExistente.cantRue = cantRue;

    actualizarFormDatos();
  }
}

function eliminarElemento() {
  const id = document.getElementById("id").value;

  // Filtra la lista para eliminar el elemento correspondiente
  listaElementos = listaElementos.filter((elemento) => elemento.id !== id);
  actualizarFormDatos();
}

function actualizarFormDatos() {
  mostrarElementosEnFormDatos(listaElementos);
  cerrarFormABM();
}
