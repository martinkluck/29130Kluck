// Solicitar por medio de prompt la cantidad de pesos que desea convertir a Bitcoin y sumarle el IVA
let entry = solicitarPesos();

while (entry != "ESC") {
  let n1 = Number(entry);

  if (isNaN(n1)) {
    alert("El valor ingresado no es un numero");
  } else {
    let resultado = pesosToBitcoin(n1);

    resultado = sumarIVA(resultado);

    mostrarResultado(n1, resultado);
  }

  entry = solicitarPesos();
}

function solicitarPesos() {
  let pesos = prompt(
    "Ingrese la cantidad de pesos que desea convertir a Bitcoin o ESC si desea salir"
  );
  return pesos;
}

function pesosToBitcoin(pesos) {
  let bitcoin = pesos / 3100;
  return bitcoin;
}

function mostrarResultado(n1, resultado) {
  alert(`${n1} pesos son ${resultado} Bitcoins incluidos el IVA`);
}

function sumarIVA(bitcoin) {
  let iva = bitcoin * 0.21;
  return bitcoin + iva;
}
