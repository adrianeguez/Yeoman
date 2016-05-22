# Yeoman Series - Paso 3

Entender como corren los metodos en el generador.

## Desarrollo

## Crear metodos en **index.js** en la carpeta `app`

Lo primero que vamos a hacer es modificar los metodos que creamos en el anterior paso, y agregar un método más.

Vamos a cambiar nuestro archivo `index.js` en la carpeta `app` con lo siguiente:

```javascript
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
//Corren en orden los metodos si no tienen callback
    primerMetodo: function () {
        console.log('Desplegar Informacion del Generador');
    },
    traerMail: function () {
        var done = this.async();
        function traerMailusuario(id) {
            setTimeout(function () {
                var correo = {correo:'correo@mail.com'};
                console.log('Se devuelve el correo del Usuario:'+id);
                console.log('Se demoro 3 segundos en terminar');
                console.log(correo);
                done();
            }, 3000)
        }
        traerMailusuario(1);
    },
    decirChao: function () {
        console.log('Gracias por usar el generador');
    }
});
```

#### Método `primerMetodo`

En este método lo único que vamos a desplegar es un mensaje de consola al usuario.

### Método `traerMail`

En este método vamos a simular que nos estamos conectando a un `api de correos` y que nos está devolviendo el correo de un usuario gracias al `id`

```javascript
    traerMail: function () {
        var done = this.async();
        function traerMailusuario(id) {
            console.log('Se devuelve el correo del Usuario:');
            setTimeout(function () {
                console.log('Se demoro 3 segundos en terminar');
                done();
            }, 3000)
        }
        traerMailusuario(1);
    }
```

Hay que notar que estamos usando un `método asincrono` para simular que estamos esperando un `api`, o por ejemplo preguntandole al usuario por `consola` cual es el nombre del proyecto.

En este caso definimos una variable `done` que la llamamos al haber terminado de ejecutar la lógica que necesitamos en este paso.


```javascript
...
    var done = this.async();
...
...
    done();
...
```

#### Método `decirChao`

En este método lo único que vamos a desplegar es un mensaje de consola despidiendo al  usuario.

## Resultado del Generador `app`

Al correr nuestro generador el output es el siguiente:
```
Desplegar Informacion del Generador
Se devuelve el correo del Usuario: 1
Se demoro 3 segundos en terminar
{ correo: 'correo@mail.com' }
Gracias por usar el generador
```

El Código ha funcionado de `manera esperada`.

## Crear metodos en **index.js** en la carpeta `crear-pagina`

En este caso vamos a usar el `mismo codigo` de la carpeta `app.js`, pero vamos a comentar 2 líneas, son `var done = this.async();` y `done()`.
```
...
    traerMail: function () {
    //var done = this.async();
    function traerMailusuario(id) {
...
...
        console.log(correo);
        //done();
    }, 3000)
...
```
## Resultado del Generador `crear-pagina`

Al correr nuestro generador el output es el siguiente:
```
Desplegar Informacion del Generador que no usa Async()
Se devuelve el correo del Usuario: 11
Gracias por usar el generador sin Async()
Se demoro 3 segundos en terminar
{ correo: 'correo@mail.com' }
```

En este caso el codigo `no funciono de la manera esperada`, esto se debe que debemos de atar a promesas asincronas a nuestros metodos para que se ejecuten en orden, sino cómo en el ejemplo, primero resuelve el codigo sincrono y luego el codigo asincrono cuando recibe una respuesta.

## Conclusion

Modificamos los metodos de los generadores simulando un api de correos.
Contrastamos la diferencia y la necesidad de usar código asincrono.

## Autor

* [Adrian Eguez](https://github.com/adrianeguez)




















