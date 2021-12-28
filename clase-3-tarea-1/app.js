let entry = prompt("Ingrese un numero o ESC si desea salir");

while (entry != "ESC") {
  let n1 = Number(entry);

  switch (n1) {
    case 0:
      alert(`El numero ${n1} es cero`);
      break;
    case 1:
        alert(`El numero ${n1} es uno`);
        break;
    case 2:
        alert(`El numero ${n1} es dos`);
        break;
    case 3:
        alert(`El numero ${n1} es tres`);
        break;
    case 4:
        alert(`El numero ${n1} es cuatro`);
        break;
    case 5:
        alert(`El numero ${n1} es cinco`);
        break;
    default:
      alert(`El valor ingresado no esta considerado`);
      break;
  }

  entry = prompt("Ingrese un numero o ESC si desea salir");
}
