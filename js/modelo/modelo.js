/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.respuestaAgregada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntasEliminadas = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var ultimaId = 0;
    this.preguntas.forEach(pregunta => {
      var idPregunta = pregunta.id;

      if (idPregunta > this.ultimoId) {
        ultimaId = idPregunta;
      }
    });

    return ultimaId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  buscarPregunta: function(id) {
    const indexDePregunta = this.preguntas.findIndex(pregunta => {
      return (id == pregunta.id);
    });

    return indexDePregunta;
  },


  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;

    var objetoRespuestas = respuestas.map(respuesta => {
      var objeto = {'textoRespuesta': respuesta, 'cantidad': 0};

      return objeto;
    });

    var nuevaPregunta = {'textoPregunta': nombre,
                         'id': id,
                         'cantidadPorRespuesta': objetoRespuestas
                        };

    

    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },


  borrarPregunta: function(idPregunta) {
  var eliminarIndex = this.buscarPregunta(idPregunta);

    this.preguntas.splice(eliminarIndex, 1);
    this.preguntaEliminada.notificar();
  },


  agregarRespuesta: function(respuesta, idPregunta) {
    const indexDePregunta = this.buscarPregunta(idPregunta);

    const objetoRespuesta = {'textoRespuesta': respuesta, 'cantidad': 0};

    this.preguntas[indexDePregunta].cantidadPorRespuesta.push(objetoRespuesta);

    this.respuestaAgregada.notificar();
  },

  
  sumarUnoVotoARespuesta: function(idPregunta, respuesta) {
    const indexDePregunta = this.buscarPregunta(idPregunta);

    //COMPLETAR 
  },


  editarPregunta: function(idPregunta, edicionPregunta) {
    const indexDePregunta = this.buscarPregunta(idPregunta);

    this.preguntas[indexDePregunta].textoPregunta = edicionPregunta;

    this.preguntaEditada.notificar();
  },


  borrarTodasPreguntas: function() {
    this.preguntas = [];

    this.preguntasEliminadas.notificar();
  },


  //se guardan las preguntas
  guardar: function(){

  },
};
