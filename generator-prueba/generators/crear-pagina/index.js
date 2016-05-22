var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  //Corren en orden los metodos
  primerMetodo: function () {
    console.log('Desplegar Informacion del Generador que no usa Async()');
  },
  traerMail: function () {
    //var done = this.async();

    function traerMailusuario(id) {
      console.log('Se devuelve el correo del Usuario: ' + id);
      setTimeout(function () {
        var correo = {
          correo: 'correo@mail.com'
        };
        console.log('Se demoro 3 segundos en terminar');
        console.log(correo);
//        done();
      }, 3000);

    }

    traerMailusuario(1);
  },
  decirChao: function () {
    console.log('Gracias por usar el generador sin Async()');
  }

});
