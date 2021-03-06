/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.respuestaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });
  
  this.modelo.preguntasEliminadas.suscribir(function() {
    contexto.vaciarLista();
  });
};




VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    nuevoItem = $('<li id="' + pregunta.id +'" class="list-group-item">' + pregunta.textoPregunta + '</li>');
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  vaciarLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];


      $('[name="option[]"]').each(function() {
        const contenidoRespuesta = $(this).val();
        if (contenidoRespuesta != false) {
          respuestas.push(contenidoRespuesta)
        }
      })

      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });


    e.botonEditarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));

      var nuevaPregunta = prompt('¿Cuál queres que sea la nueva pregunta?');

      contexto.controlador.editarPregunta(id, nuevaPregunta);
    });


    e.botonBorrarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));

      contexto.controlador.borrarPregunta(id);
    });


    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodo();
    });

    
    //asociar el resto de los botones a eventos
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};

