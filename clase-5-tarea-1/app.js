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

while (entry != "ESC") {
  let pesos = Number(entry);

  if (isNaN(pesos)) {
    alert("El valor ingresado no es un numero");
  } else {
    let cotizacion = new Cotizacion(pesos);
    cotizacion.pesosABitcoin();
    cotizacion.sumarIVA();
    cotizacion.mostrarResultado();
  }

  entry = solicitarPesos();
}

function solicitarPesos() {
  let pesos = prompt(
    "Ingrese la cantidad de pesos que desea convertir a Bitcoin o ESC si desea salir"
  );
  return pesos;
}
