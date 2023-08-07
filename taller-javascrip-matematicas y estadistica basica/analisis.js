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

  console.log(medianaSalarios);
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

  console.log({nuevoSalario});

  return nuevoSalario;
}
