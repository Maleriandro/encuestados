/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    const esPreguntaValida = this.verificarStringValido(pregunta);

    const esRespuestasValido = this.verificarArrayValido(respuestas);

    if (esPreguntaValida == false) {
      alert('Ingrese una pregunta válida');
    } else if (esRespuestasValido == false) {
      alert('Ingrese respuestas');
    } else {
      this.modelo.agregarPregunta(pregunta, respuestas);
    }
  },


  borrarPregunta: function(id) {
    if(Number.isInteger(id)) {
      this.modelo.borrarPregunta(id);
    } else {
      alert('Intente de nuevo o reinice la pagina');
      console.log('La id = ' + id + ' no es un numero');
    }
  },


  borrarTodo: function() {
    this.modelo.borrarTodasPreguntas();
  },


  editarPregunta: function(id, pregunta) {
    const esPreguntaValida = this.verificarStringValido(pregunta);

    const esIdValido = Number.isInteger(id);

    if (esPreguntaValida == false) {
      alert('Ingrese una pregunta válida');
    } else if (esIdValido == false) {
      alert('Intente de nuevo o reinice la pagina');
      console.log('La id = ' + id + ' no es un numero');
    } else {
      this.modelo.editarPregunta(id, pregunta);
    }
  },


  agregarVoto: function(pregunta, respuesta) {
    const esPreguntaValida = this.verificarStringValido(pregunta);

    const esRespuestaValida = this.verificarStringValido(respuesta);

    if (esRespuestaValida == false) {
      alert('Tenes que votar una respuesta');
    } else if (esPreguntaValida == false) { 
      alert('Intente de nuevo o reinice la pagina');
      console.log('Se esperaba que pregunta: ' + pregunta + ' tuviera algún valor');
    } else {

      this.modelo.agregarVoto(pregunta, respuesta);
    }
  },


  verificarStringValido: function(valor) {
    const esString = typeof(valor) == 'string' && valor.length > 0;

    return esString;
  },


  verificarArrayValido: function(valor) {
    const esArray = Array.isArray(valor) && valor.length > 1;

    return esArray;
  }
};
