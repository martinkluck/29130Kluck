// Declaracion del objeto Cotizacion con sus atributos y metodos

class Cotizacion {
  constructor(pesos) {
    this.pesos = pesos;
    this.bitcoin = 0;
  }

  pesosABitcoin() {
    this.bitcoin = this.pesos / 3100;
  }

  sumarIVA() {
    let iva = this.bitcoin * 0.21;
    return this.bitcoin + iva;
  }
}

// Solicitar por medio de prompt la cantidad de pesos que desea convertir a Bitcoin y sumarle el IVA
// let entry = solicitarPesos();

let cotizaciones = [];

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
    mostrarCotizaciones();
  }
}

function mostrarCotizaciones() {
  let table = document.getElementById("table");
  table.innerHTML = "";
  cotizaciones
    .map((cotizacion) => {
      return {
        pesos: `$ ${cotizacion.pesos}`,
        bitcoin: `${cotizacion.bitcoin}`,
      };
    })
    .forEach((cotizacion) => {
      let row = table.insertRow();
      let cell1 = row.insertCell();
      let cell2 = row.insertCell();
      cell1.style.textAlign = "center";
      cell1.innerHTML = cotizacion.pesos;
      cell2.style.textAlign = "center";
      cell2.innerHTML = cotizacion.bitcoin;
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
  div.className = "alert alert-primary mt-3 mb-3 bg-light";
  div.innerHTML = `Coitizaciones mayores a 10000 pesos: ${more.length}`;
  c.appendChild(div);

  let minus = cotizaciones.filter((cotizacion) => cotizacion.pesos < 10000);
  let div2 = document.createElement("div");
  div2.className = "alert alert-primary mt-3 mb-3 bg-light";
  div2.innerHTML = `Coitizaciones menores a 10000 pesos: ${minus.length}`;
  c.appendChild(div2);

  let find = cotizaciones.find(
    (cotizacion) => cotizacion.bitcoin - (cotizacion.bitcoin % 1) == 1
  );
  if (find) {
    let div3 = document.createElement("div");
    div3.className = "alert alert-primary mt-3 mb-3 bg-light";
    div3.innerHTML = `Cotizaciones cerca a un bitcoin exacto: ${find.pesos}`;
    c.appendChild(div3);
  }
}

let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  cotizar(e.target.elements[0].value);
  e.target.elements[0].value = "";
});
