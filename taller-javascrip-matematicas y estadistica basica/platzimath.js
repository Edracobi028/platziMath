const PlatziMath = {}; //creamos una variable objeto "central" donde guardaremos las funciones creadas

PlatziMath.esPar = function esPar(lista){
    return !(lista.length % 2); //Se niega ya que el resultado false es el par
}

PlatziMath.esImpar = function esImpar(lista){
    return lista.length % 2; 
}

PlatziMath.calcularModa = function calcularModa(lista){
    const listaCount = {}; //para ir contando cuantas veces aparece un elemento

    for (let i=0; i<lista.length; i++){
        const elemento = lista[i];

        //si existe en nuestra listaCount sume uno, caso contrario solo add valor 1
        if (listaCount[elemento]){
            listaCount[elemento] += 1;
        }else {
            listaCount[elemento] = 1; //Poner un valor cada que agreguemos el elemento al listaCount
        }
    }

    const listaArray = Object.entries(listaCount);
    const listaOrdenada = ordenarListaBidimensional(listaArray, 1);
    const listaMaxNumber = listaOrdenada[listaOrdenada.length - 1]; //obtener el elemento con numero mas alto
    //console.log({listaCount, listaArray, listaOrdenada, listaMaxNumber});
    //console.log("La moda es: ",listaMaxNumber[0]);
    const moda = listaMaxNumber[0]; //guardarlo en una variable
    return moda;

}

PlatziMath.calcularMediana = function calcularMediana(listaDesordenada){
    const lista = ordenarLista(listaDesordenada);
    const listaEsPar = esPar(lista); //evaluamos si es par o imprar

    if (listaEsPar) {
        const mitad1ListaPar = lista[(lista.length / 2) - 1]; // obtener el 1er numero
        const mitad2ListaPar = lista[lista.length / 2]; // obtener el 2do numero
        const listaMitades = [mitad1ListaPar, mitad2ListaPar];
        const medianaListaPar = calcularPromedio(listaMitades);
        return medianaListaPar;
    }else {
         //quitar decimales y sumar uno
        const indexMitadListaImpar = Math.floor(lista.length / 2); //1
        const medianaListaImpar = lista[indexMitadListaImpar]; //20
        console.log(indexMitadListaImpar);
        console.log(medianaListaImpar);
        return medianaListaImpar;
    }
}

PlatziMath.calcularPromedio = function calcularPromedio(lista){
    function sumarTodosElementos(valorAcumulado, nuevoValor){
        return valorAcumulado + nuevoValor;
    }

    const sumaLista = lista.reduce(sumarTodosElementos);
    const promedio = sumaLista / lista.length;
    console.log(promedio);
    return promedio;
}

PlatziMath.ordenarLista = function ordenarLista(listaDesordenada){
    //Recibirá acumulado y nuevo valor
    function ordenarLista (valorAcumulado, nuevoValor){
        // if (valorAcumulado > nuevoValor) {
        //     return 1; 
        // } else if (valorAcumulado == nuevoValor){
        //     return 0;
        // } else if (valorAcumulado < nuevoValor){
        //     return -1;
        // }
        return valorAcumulado - nuevoValor;

    }
    const lista = listaDesordenada.sort((a,b)=> a-b ); //a estas funciones debemos mandarles una funcion
    return lista;
}

PlatziMath.ordenarListaBidimensional = function ordenarListaBidimensional(listaDesordenada, i){

    function ordenarListaSort (valorAcumulado, nuevoValor){
        return valorAcumulado[i] - nuevoValor[i];
    }
    const lista = listaDesordenada.sort(ordenarListaSort);

    return lista;
}

PlatziMath.promedioPonderado = function promedioPonderado(notes){

    //multiplicar cada numero de la lista por su peso
    const notesWithCredit = notes.map(function (noteObject) {
        return noteObject.note * noteObject.credit;
    });
    //console.log(notesWithCredit);

    //Sumar todos los elementos del arreglo de elementos multiplicados por su peso
    const sumOfNotesWithCredit = notesWithCredit.reduce(
        function (sum = 0, newVal) {
            return sum + newVal;
        }
    );
    //console.log(sumOfNotesWithCredit);

    //Sumar todos los pesos (créditos)
    const credits = notes.map(function (noteObject) {
        return noteObject.credit;
    });
    //console.log("Creditos", credits);

    const sumOfCredits = credits.reduce(
        function (sum = 0, newVal) {
            return sum + newVal;
        }
    );
    //console.log("suma de creditos", sumOfCredits);

    //Hacer la división entre ambas “sumas”
    const promedioPonderadoNotasConCreditos = sumOfNotesWithCredit / sumOfCredits;

    return promedioPonderadoNotasConCreditos;

}

