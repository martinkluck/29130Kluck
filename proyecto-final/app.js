// Declaracion del objeto Cotizacion con sus atributos y metodos

class Cotizacion {
  constructor(pesos) {
    this.pesos = pesos;
    this.bitcoin = 0;
  }

  pesosABitcoin() {
    this.bitcoin = this.pesos / localStorage.getItem("bitcoin");
  }

  sumarIVA() {
    let iva = this.bitcoin * 0.21;
    return this.bitcoin + iva;
  }
}

// Solicitar por medio de prompt la cantidad de pesos que desea convertir a Bitcoin y sumarle el IVA
// let entry = solicitarPesos();

let cotizaciones = [];
let errors = document.getElementById("errors");
if (localStorage.getItem("cotizaciones") != null) {
  cotizaciones = JSON.parse(localStorage.getItem("cotizaciones"));
  mostrarCotizaciones();
} else {
  errors.innerHTML = "No hay cotizaciones guardadas";
  let spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}

function solicitarPesos() {
  let pesos = prompt(
    "Ingrese la cantidad de pesos que desea convertir a Bitcoin o ESC si desea salir"
  );
  return pesos;
}

function cotizar(entry) {
  let pesos = Number(entry);

  if (isNaN(pesos)) {
    let errors = document.getElementById("errors");
    errors.innerHTML = "El valor ingresado no es un numero";
  } else {
    let cotizacion = new Cotizacion(pesos);
    cotizacion.pesosABitcoin();
    cotizacion.sumarIVA();
    cotizaciones.push(cotizacion);
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));
    mostrarCotizaciones();
  }
}

function mostrarCotizaciones() {
  let table = document.getElementById("table");
  table.innerHTML = "";
  cotizaciones.forEach((cotizacion) => {
    let row = table.insertRow();
    row.classList =
      "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100";
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let div = document.createElement("div");
    div.classList = "text-center text-sm text-gray-900 px-2 py-1";
    div.innerHTML = cotizacion.pesos;
    cell1.appendChild(div);
    div = document.createElement("div");
    div.classList = "text-center text-sm text-gray-900 px-2 py-1";
    div.innerHTML = cotizacion.bitcoin;
    cell2.appendChild(div);
    if (parseInt(cotizacion.bitcoin) < 1) {
      cell2.style.backgroundColor = "#f56d6d";
      cell2.style.color = "#fff";
    } else {
      cell2.style.backgroundColor = "#486d6d";
      cell2.style.color = "#fff";
    }
  });

  let c = document.getElementById("cotizaciones");
  c.innerHTML = "";
  let more = cotizaciones.filter((cotizacion) => cotizacion.pesos > 10000);
  let div = document.createElement("div");
  div.className = "alert alert-primary mt-3 mb-3 bg-light text-center";
  div.innerHTML = `Coitizaciones mayores a 10000 pesos: ${more.length}`;
  c.appendChild(div);

  let minus = cotizaciones.filter((cotizacion) => cotizacion.pesos < 10000);
  let div2 = document.createElement("div");
  div2.className = "alert alert-primary mt-3 mb-3 bg-light text-center";
  div2.innerHTML = `Coitizaciones menores a 10000 pesos: ${minus.length}`;
  c.appendChild(div2);

  let find = cotizaciones.find(
    (cotizacion) => cotizacion.bitcoin - (cotizacion.bitcoin % 1) == 1
  );
  if (find) {
    let div3 = document.createElement("div");
    div3.className = "alert alert-primary mt-3 mb-3 bg-light text-center";
    div3.innerHTML = `Cotizaciones cerca a un bitcoin exacto: ${find.pesos}`;
    c.appendChild(div3);
  }

  let cotizationTable = document.getElementById("cotizationTable");
  let spinner = document.getElementById("spinner");
  let coti = document.getElementById("coti");
  spinner.style.display = "block";
  errors.style.display = "none";
  coti.classList.add("invisible");
  cotizationTable.classList.add("invisible");
  c.classList.add("invisible");
  setTimeout(() => {
    spinner.style.display = "none";
    cotizationTable.classList.remove("invisible");
    coti.classList.remove("invisible");
    c.classList.remove("invisible");
  }, 1000);
}

let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  cotizar(e.target.elements[0].value);
  e.target.elements[0].value = "";
});

window.addEventListener("load", (e) => {
  axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=ars"
    )
    .then((response) => {
      localStorage.setItem("bitcoin", response.data.bitcoin.ars);
    });
});
