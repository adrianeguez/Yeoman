var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompting: function () {
    //Definimos los nombres, tipos mensajes y valores por Default de las respuestas del usuario
    console.log("Bienvenido a pizzas Yeoman");
    var respuestas = [{
        type: 'input',
        name: 'nombre',
        message: '¿Cuál es tu nombre?',
        default: 'nombre'
    }, {
        type: 'input',
        name: 'apellido',
        message: '¿Cuál es tu apellido?',
        default: 'apellido'
    },{
      type: 'password',
      message: 'Ingrese su password de "Pizzas Yeoman"',
      name: 'password'
    }, {
        type: 'confirm',
        name: 'mayorEdad',
        message: '¿Eres mayor de edad?',
        default: false
    }, {
        type: 'list',
        name: 'tamanoPizza',
        message: '¿Qué tamaño de pizza desea ordenar?',
        choices: ['Jumbo', 'Grande', 'Estandar', 'Medio', 'Pequeño', 'Micro'],
        default: 'Estandar'
    }, {
        type: 'rawlist',
        name: 'tamanoBebida',
        message: '¿Qué tamaño su bebida?',
        choices: ['Grande', 'Estandar', 'Pequeño'],
        default: 'Estandar'
    }, {
        type: 'checkbox',
        message: 'Seleccione sus ingredientes',
        name: 'ingredientes',
        choices: [
          {
            name: 'Pepperoni',
            disabled: '¡Se termino!, lo sentimos'
        },
          {
            name: 'Mozzarella',
            checked: true
        },
          {
            name: 'Tomate',
            checked: true
        },
          {
            name: 'Jamon'
        },
          {
            name: 'Olivas',
            disabled: '¡Se termino!, lo sentimos'
        },
          {
            name: 'Queso Extra'
        }
      ]
      },
      {
        type: 'expand',
        message: '¿Cómo le parecio nuestro servicio? Elija una ópcion a b c x',
        name: 'satisfaccion',
        default: 3,
        choices: [
          {
            key: 'a',
            name: 'Muy Bueno',
            value: 4
          },
          {
            key: 'b',
            name: 'Bueno',
            value: 3
          },
          {
            key: 'c',
            name: 'Regular',
            value: 2
          },
          {
            key: 'x',
            name: 'Malo',
            value: 1
          }
        ]
            }];
    //Definimos la función Callback del método prompt usado por yeoman
    var usuarioResponde = function (respuestas) {
      //Notemos que no vamos a usar el console.log, sino el log de yeoman
      this.log('DETALLES DE LA ORDEN');
      this.log('Nombre del usuario:', respuestas.nombre);
      this.log('Apellido del usuario:', respuestas.apellido);
      this.log('Password del usuario:', respuestas.password);
      this.log('Mayor de Edad:', respuestas.mayorEdad);
      this.log('Tamaño de la pizza:', respuestas.tamanoPizza);
      this.log('Tamaño de la bebida:', respuestas.tamanoBebida);
      this.log('Ingredientes:');
      for (var i = 0; i < respuestas.ingredientes.length; i++) {
        this.log('>>' + respuestas.ingredientes[i]);
      }
      this.log('Satisfacción del Usuario:', respuestas.satisfaccion);

      //No olvidemos de mandar el .bind(this) necesario para yeoman
    }.bind(this);

    //Finalmente corremos la funcion prompt con el primer parámetro de respuestas del usuario
    //Y el segundo parámetro el Callback de las respuestas

    return this.prompt(respuestas, usuarioResponde);
  }

});
