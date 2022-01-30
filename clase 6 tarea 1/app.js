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

  mostrarResultado() {
    alert(`${this.pesos} pesos son ${this.bitcoin} Bitcoins incluidos el IVA`);
  }
}

// Solicitar por medio de prompt la cantidad de pesos que desea convertir a Bitcoin y sumarle el IVA
let entry = solicitarPesos();

let cotizaciones = [];

while (entry != "ESC") {
  let pesos = Number(entry);

  if (isNaN(pesos)) {
    alert("El valor ingresado no es un numero");
  } else {
    let cotizacion = new Cotizacion(pesos);
    cotizacion.pesosABitcoin();
    cotizacion.sumarIVA();
    cotizaciones.push(cotizacion);
  }

  entry = solicitarPesos();
}

cotizaciones.forEach((cotizacion) => {
  cotizacion.mostrarResultado();
});

cotizaciones
  .map((cotizacion) => {
    return {
      pesos: `$ ${cotizacion.pesos}`,
      bitcoin: `${cotizacion.bitcoin}`,
    };
  })
  .forEach((cotizacion) => console.log(cotizacion));

let more = cotizaciones.filter((cotizacion) => cotizacion.pesos > 10000);
alert(`Coitizaciones mayores a 10000 pesos: ${more.length}`);

let minus = cotizaciones.filter((cotizacion) => cotizacion.pesos < 10000);
alert(`Coitizaciones menores a 10000 pesos: ${minus.length}`);

let find = cotizaciones.find((cotizacion) => (cotizacion.bitcoin - (cotizacion.bitcoin % 1)) == 1);
alert(`Cotizaciones cerca a un bitcoin exacto: ${find.pesos}`);

function solicitarPesos() {
  let pesos = prompt(
    "Ingrese la cantidad de pesos que desea convertir a Bitcoin o ESC si desea salir"
  );
  return pesos;
}
