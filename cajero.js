class Billete //INSTANCIA
{
    constructor(v, c) {
        this.valor = v;
        this.cantidad = c;
    }
}

function entregarDinero() {
    resultado.innerHTML = "";  //limpia el campo de historico
    monto_input = parseInt(boxdinero.value); //convierte el valor en Int

    if (monto_input > stock) {
        alert("El CAJERO NO CUENTA CON EL SUFICIENTE EFECTIVO");
        boxdinero.value = "";
        //resultado.innerHTML = "No se pudo completar la solicitud </br>"; PENDIENTE DE MANTENIMIENTO
    }

    else {
        for (var i of caja) {

            num_operado = Math.floor(monto_input / i.valor);

            if (num_operado > i.cantidad) {
                papeles = i.cantidad;
                i.cantidad -= papeles;
            }

            else {
                papeles = num_operado;
                i.cantidad -= papeles;
            }

            entregado.push(new Billete(i.valor, papeles));
            monto_input -= (i.valor * papeles);

        }

    }


    for (var i of entregado) { //Muestra el historico
        if (i.cantidad > 0) {
            resultado.innerHTML += i.cantidad + " billetes de Q." + i.valor + ".00 <br/>";
        }
    }

    fStock(); //Actualiza el stock
    boxdinero.value = ""; //limpia el input luego del evento
}


function buttonEnter(x) {  //FUNCION QUE LEE EL ENTER
    if (x.keyCode == 13) {
        entregarDinero();
    }

}

function fStock() {   //FUNCION QUE VALIDA EL STOCK EN TIEMPO REAL
    stock = 0;
    for (var i of caja) {
        stock += (i.valor * i.cantidad);
    }
    total_efectivo.innerHTML = stock + " Q <br />";
}

//DECALARACION DE VARIABLES GLOBALES
var stock = 0;
var monto_input = 0;
var num_operado = 0;
var papeles = 0;

//ARREGLOS
var caja = [];
caja.push(new Billete(100, 10));
caja.push(new Billete(50, 10));
caja.push(new Billete(20, 10));
caja.push(new Billete(10, 10));
caja.push(new Billete(5, 10));

var entregado = []; 

var boxdinero = document.getElementById("dinero")
var resultado = document.getElementById("resultado");
var boton = document.getElementById("extraer");
var total_efectivo = document.getElementById("t_efectivo");

//LLAMAR A FUNCIONES
fStock(); //Muestra el stock inicial
boton.addEventListener("click", entregarDinero); //Ejecuta la funcion principal con clic en boton
boxdinero.addEventListener("keydown", buttonEnter); // Ejecuta la funcion principal con enter

