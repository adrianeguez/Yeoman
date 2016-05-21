var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    //Corren en orden los metodos
    cualquierNombre: function () {
        console.log('Primero va a correr el metodo cualquierNombre');
    },
    otroNombre: function () {
        console.log('y Luego va a correr el metodo otroNombre');
    }

});