/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
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

  borrarPregunta: function(id) {
  var eliminarIndex = this.preguntas.findIndex(pregunta => {
      return (id == pregunta.id);
    });

    this.preguntas.splice(eliminarIndex, 1);
    this.preguntaEliminada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
  },
};
