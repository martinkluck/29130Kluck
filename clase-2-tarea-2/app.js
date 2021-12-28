let n1 = Number(prompt("Ingrese un numero"));

if(n1 > 0){
    alert(`El numero ${n1} es positivo`);
} else if (n1 < 0){
    alert(`El numero ${n1} es negativo`);
} else if (n1 == 0){
    alert(`El numero ${n1} es cero`);
} else if (isNaN(n1)){
    alert(`El valor ingresado no es un numero`);
}
