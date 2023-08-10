console.log(salarios);
const personaEnBusqueda = "Juanita";
//Análisis personal para Juanita

function encontrarPersona(personaEnBusqueda) {
  //optimizada
  return salarios.find((persona) => persona.name == personaEnBusqueda);

  /*  const persona = salarios.find((persona) => {
        return persona.name == personaEnBusqueda;
    });
    return persona;
 */
}

//buscar la mediana de los precios donde recibimos el nombre de la persona
function medianaPorPersona(nombrePersona) {
  //buscar con el nombre que recibimos asignandola a una variable y como devuelve un objeto solo traer la propiedad trabajos
  const trabajos = encontrarPersona(nombrePersona).trabajos;

  //obtener solo los salarios en array
  const salarios = trabajos.map(function (elemento) {
    return elemento.salario;
  });

  //en una variable mandamos a llamar la funcion para calcular mediana desde la clase Principal
  const medianaSalarios = PlatziMath.calcularMediana(salarios);

  //console.log(medianaSalarios);
  return medianaSalarios;
}

function proyeccionPorPersona(nombrePersona){
  //encontramos a la persona y solo nos traemos trabajos
  const trabajos = encontrarPersona(nombrePersona).trabajos;

  //Hacer un arreglo con los incrementos de cada año
  let porcentajesCrecimiento = [];

  //for donde empieze de la posición uno
  for (let i = 1; i < trabajos.length; i++){
    const salarioActual = trabajos[i].salario; //ya que es objeto añadimos .salrio
    const salarioPasado = trabajos[i - 1].salario;
    const crecimiento = salarioActual - salarioPasado;
    const porcentajeCrecimiento = crecimiento / salarioPasado;
    porcentajesCrecimiento.push(porcentajeCrecimiento) //agrrgamos al arreglo
  }
  
  //en una variable llamar la funcion de mediana
  const medianaPorcentajesCrecimiento = PlatziMath.calcularMediana(porcentajesCrecimiento);
  
  //console.log({porcentajesCrecimiento, medianaPorcentajesCrecimiento}); 

  const ultimoSalario = trabajos[trabajos.length - 1].salario;
  const aumento = ultimoSalario * medianaPorcentajesCrecimiento;
  const nuevoSalario = ultimoSalario + aumento;

  return nuevoSalario;
}

//crear un objeto con todas las empresas y llenar con toda la info
const empresas = {};

//Recorrer areglo de salarios por cada persona
for (persona of salarios){
  //recorremos cada uno de los trabajos de la persona
  for (trabajo of persona.trabajos){
    //si la empresa no existe dentro de empresas, la creamos
    if (!empresas[trabajo.empresa]){
      empresas[trabajo.empresa] = {}; //crea objeto
    }
    //checamos si tiene la propiedad de nombre
    if (!empresas[trabajo.empresa][trabajo.year]){
      empresas[trabajo.empresa][trabajo.year] = []; //crear array
    }

    //Insertar el salario, a la empresa con el valor nombre y año
    empresas[trabajo.empresa][trabajo.year].push(trabajo.salario);

  }
}

console.log({empresas});

//Recibe nombre de empresa y año
function medianaEmpresaYear(nombre, year){
  //verificar si existe el nombre que nos pasaron de empresa y el año en esa empresa con salario
  if(!empresas[nombre]){
    console.warn('La empresa no existe');
  }else if (!empresas[nombre][year]){
    console.warn('La empresa no dio salarios ese año');
  } else {
    //tomamos de el arreglo de las empresas con el nombre y el año
    return PlatziMath.calcularMediana(empresas[nombre][year]);
  }
}

//crear un array de lista de medianas de cada array

function proyeccionPorEmpresa(nombre) {
  //validar si la elnombre de empresa es valido
  if(!empresas[nombre]){
    console.warn('La empresa no existe');
  }else {
    //obtener los años
    const empresaYears = Object.keys(empresas[nombre]);

    //por cada año sacar la mediana
    const listaMedianaYears = empresaYears.map( (year) => {
      return medianaEmpresaYear(nombre,year); //por cada año mandar a llamar a la funcion de mediana
    });

    //Hacer un arreglo con los incrementos de cada año
    let porcentajesCrecimiento = [];

    //for donde empieze de la posición uno
    for (let i = 1; i < listaMedianaYears.length; i++){
      const salarioActual = listaMedianaYears[i]; //ya que es objeto añadimos .salrio
      const salarioPasado = listaMedianaYears[i - 1];
      const crecimiento = salarioActual - salarioPasado;
      const porcentajeCrecimiento = crecimiento / salarioPasado;
      porcentajesCrecimiento.push(porcentajeCrecimiento) //agrrgamos al arreglo
    }
    
    //en una variable llamar la funcion de mediana
    const medianaPorcentajesCrecimiento = PlatziMath.calcularMediana(porcentajesCrecimiento);

    const ultimaMediana = listaMedianaYears[listaMedianaYears.length - 1];
    const aumento = ultimaMediana * medianaPorcentajesCrecimiento;
    const nuevaMediana = ultimaMediana + aumento;

    return nuevaMediana;


  }
}

//Análisis general
function medianaGeneral(){
  //Arreglo de nombres donde nombramos al elemento principal como persona y traemos solo los nombres, incluyendo la llamada de la funcion que obtiene la mediana
  const listaMedianas = salarios.map( 
    persona => medianaPorPersona(persona.name)
  );
  //por cada nombre mandar a llamar la funcion
  const mediana = PlatziMath.calcularMediana(listaMedianas);

  return mediana;
}

function medianaTop10() {
  const listaMedianas = salarios.map(
    persona => medianaPorPersona(persona.name)
  );

  const medianasOrdenadas = PlatziMath.ordenarLista(listaMedianas);

  const cantidad = listaMedianas.length / 10;
  const limite = listaMedianas.length - cantidad;

  //Crear un arreglo desde el limite al final
  const top10 = medianasOrdenadas.slice(limite, medianasOrdenadas.length);

  const medianaTop10 = PlatziMath.calcularMediana(top10);
  return medianaTop10;
}



