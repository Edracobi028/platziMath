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
