var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    //Los metodos corren en orden
    crearPagina: function () {
        console.log('Primero va a crear la pagina');
    },
    iniciarServidorWeb: function () {
        console.log('y Luego va a levantar el servidor web');
    }

});