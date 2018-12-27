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
  this.votoAgregado = new Evento(this);
};


Modelo.prototype = {
  inicializar: function() {
    this.cargarLocalStorage();
  },


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
  buscarPreguntaPorId: function(id) {
    const indexDePregunta = this.preguntas.findIndex(pregunta => {
      return (id == pregunta.id);
    });

    return indexDePregunta;
  },


  buscarPreguntaPorTexto: function(texto) {
    const indexDePregunta = this.preguntas.findIndex(pregunta => {
      return (texto == pregunta.textoPregunta);
    });

    return indexDePregunta;
  },


  buscarRespuestaPorTexto: function(indexPregunta, texto) {
    const indexDeRespuesta = this.preguntas[indexPregunta].cantidadPorRespuesta.findIndex(respuesta => {
      return (texto == respuesta.textoRespuesta);
    });

    return indexDeRespuesta;
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

    this.actualizarLocalStorage();
    this.preguntaAgregada.notificar();
  },


  borrarPregunta: function(idPregunta) {
  var eliminarIndex = this.buscarPreguntaPorId(idPregunta);

    this.preguntas.splice(eliminarIndex, 1);

    this.actualizarLocalStorage();
    this.preguntaEliminada.notificar();
  },


  agregarRespuesta: function(respuesta, idPregunta) {
    debugger;
    const indexDePregunta = this.buscarPreguntaPorId(idPregunta);

    const objetoRespuesta = {'textoRespuesta': respuesta, 'cantidad': 0};

    this.preguntas[indexDePregunta].cantidadPorRespuesta.push(objetoRespuesta);

    this.actualizarLocalStorage();
    this.respuestaAgregada.notificar();
  },

  
  agregarVoto: function(idPregunta, respuesta) {
    const indexDePregunta = this.buscarPreguntaPorTexto(idPregunta);

    var indexDeRespuesta = this.buscarRespuestaPorTexto(indexDePregunta, respuesta);

    this.preguntas[indexDePregunta].cantidadPorRespuesta[indexDeRespuesta].cantidad += 1;

    this.actualizarLocalStorage();
    this.votoAgregado.notificar();
  },


  editarPregunta: function(idPregunta, edicionPregunta) {
    const indexDePregunta = this.buscarPreguntaPorId(idPregunta);

    this.preguntas[indexDePregunta].textoPregunta = edicionPregunta;

    this.actualizarLocalStorage();
    this.preguntaEditada.notificar();
  },


  borrarTodasPreguntas: function() {
    this.preguntas = [];

    this.actualizarLocalStorage();
    this.preguntasEliminadas.notificar();
  },

  
  //se guardan las preguntas
  actualizarLocalStorage: function() {
    const JSONpreguntas = JSON.stringify(this.preguntas);

    localStorage.setItem('preguntas', JSONpreguntas);
  },


  cargarLocalStorage: function() {
    const preguntasLocalStorage = localStorage.getItem('preguntas');
    
    console.log(preguntasLocalStorage);
    if (preguntasLocalStorage !== null && preguntasLocalStorage.length !== 0) {
      const preguntasJSON = JSON.parse(preguntasLocalStorage);
      
      if (Array.isArray(preguntasJSON)) {
        this.preguntas = preguntasJSON;
        this.preguntaAgregada.notificar();
      }
    }
  }

  //COMPLETAR ELIMINAR, EDITAR Y AGARRAR PREGUNTAS
};
