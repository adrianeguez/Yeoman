# Yeoman Series - Paso 3

Aprenderemos a recibir inputs del usuario.

# Interacción con el Usuario

## Interacción tipo `input`

Ahora vamos a empezar a recibir datos del usuario para poder generar, por ejemplo, un `controlador en angularjs` o un `factory` con el nombre determinado por el usuario.

En nuestro caso vamos a empezar solo a recibir los inputs.

Vamos a modificar nuestro archivo `index.js` en nuestra carpeta `app` para dejar solamente un método llamado `prompting`, de la siguiente manera:

```javascript
...
  prompting: function () {
  }
...
```

El nombre de método [prompting](http://yeoman.io/authoring/running-context.html) se debe por los 8 pasos estandarizados que tiene `yeoman` de los cuales hablaremos en un futuro.

`Yeoman` utiliza la libreria [inquirer.js](https://github.com/SBoudrias/Inquirer.js) para preguntar al usuario los diferentes datos que vamos a necesitar.

Lo primero que haremos es agregar un arreglo de preguntas al usuario en el archivo `index.js`:
```javascript
...
prompting: function () {
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
  }];
}
...
```
Después vamos a agregar el `Callback asincrono` de nuestras preguntas de la siguiente manera:
```javascript
...
  prompting: function () {
    ...
    default: 'apellido'
    }];
    var usuarioResponde = function (respuestas) {
        this.log('Nombre del usuario:', respuestas.nombre);
        this.log('Apellido del usuario:', respuestas.apellido);
      }.bind(this);
  }
...
```

Notemos que ya no estamos usando el `console.log` sino el `this.log` de `Yeoman`, además al final de nuestra función utilizamos un método `.bind(this)` requerido por **Yeoman**.

Finalmente vamos a devolver la funcion `this.prompt()` invocando las `preguntas` y el `Callback` que implementamos, nuestro archivo finalmente se encuentra así:
```javascript
prompting: function () {
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
  }];
  var usuarioResponde = function (respuestas) {
      this.log('Nombre del usuario:', respuestas.nombre);
      this.log('Apellido del usuario:', respuestas.apellido);
    }.bind(this);
  return this.prompt(respuestas, usuarioResponde);
}
```
Al correr nuestro generador e ingresar de nombre `Adrian` y apellido `Eguez`:
```
yo prueba
```
El output es el siguiente:
```
? ¿Cuál es tu nombre? (nombre) Adrian
? ¿Cuál es tu nombre? Adrian
? ¿Cuál es tu apellido? Eguez
Apellido del usuario: Adrian
Nombre del usuario: Eguez
```
Si dejamos en blanco los campos el resultado será a su vez el siguiente:
```
? ¿Cuál es tu nombre? nombre
? ¿Cuál es tu apellido? apellido
Nombre del usuario: nombre
Apellido del usuario: apellido
```
## Interacción tipo `confirm`, `list`, `rawlist`, `expand`, `checkbox` y `password`

Hay varios `tipos de inputs` que el usuario puede ingresar. Vamos a usar algunos métodos, para hacerlo cambiamos el `arreglo respuestas` en nuestro archivo `index.js` en la carpeta `app` así:

```javascript
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
```
Por ultimo agregamos los logs:
```javascript
...
var usuarioResponde = function (respuestas) {
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
}.bind(this);
...
```


Al correr nuestro generador tenemos el siguiente output:
```
Bienvenido a pizzas Yeoman
? ¿Cuál es tu nombre? Adrian
? ¿Cuál es tu apellido? Eguez
? Ingrese su password de "Pizzas Yeoman" *********
? ¿Eres mayor de edad? Yes
? ¿Qué tamaño de pizza desea ordenar? Grande
? ¿Qué tamaño su bebida? Estandar
? Seleccione sus ingredientes Mozzarella, Tomate, Jamon
? ¿Cómo le parecio nuestro servicio? Elija una ópcion a b c x Bueno
DETALLES DE LA ORDEN
Nombre del usuario: Adrian
Apellido del usuario: Eguez
Password del usuario: clave1234
Mayor de Edad: true
Tamaño de la pizza: Grande
Tamaño de la bebida: Estandar
Ingredientes:
>> Mozzarella
>> Tomate
>> Jamon
Satisfacción del Usuario: 3
```



## Conclusion

Aprendimos a recibir información del Usuario.

Utilizamos ejemplos de los tipos de inputs `confirm`, `list`, `rawlist`, `expand`, `checkbox` y `password`.

## Autor

* [Adrian Eguez](https://github.com/adrianeguez)




















