# Yeoman Series - Paso 2

Crear nuestro primer generador.

## Desarrollo

### Crear Carpeta `generator-prueba`

Lo primero que vamos a hacer es crear una carpeta de la siguiente manera:  `generator-nombre-del-generador`. 

```
    --generator-nombre-del-generador/
```

El nombre de la carpeta es muy importante, ya que yeoman es sensitivo a los nombres de archivos y carpetas, después usaremos el `generator-nombre-del-generador` de nuestra carpeta creada para poder correr nuestro generador de esta manera **al finalizar este tutorial**:

```
yo nombre-del-generador
```
En nuestro ejemplo usaremos el siguiente nombre de la carpeta `generator-prueba`, quedando nuestro directorio de la siguiente manera:

```
    --generator-prueba/
```

### Crear archivo `package.json`

Primero debemos de ingresar a nuestra carpeta creada `generator-prueba`

```
cd generator-prueba
```

Despues vamos a crear un nuevo archivo `package.json` con el siguiente comando:

```
npm init
```

Node nos preguntara los siguientes datos:

```
name:
version: 
description: 
entry point: 
test command:
git repository:
keywords:
author:
license:

```

Este archivo es utilizado por nodejs para instalar dependencias scripts en Node.js, en nuestro caso lo usaremos para `delimitar la estructura de nuestro generador`.

Al finalizar podemos abrir con cualquier editor de texto el archivo `package.json`, el cual lo vamos a editar para que quede de la siguiente manera:

```javascript
{
    "name": "generator-prueba",
    "version": "1.0.0",
    "description": "Tutorial de Uso de Yeoman",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
        },
    "keywords": [
        "yeoman-generator"
    ],
    "dependencies": {
        "yeoman-generator": "^0.20.2"
    },
    "author": "Adrian Eguez",
    "license": "MIT"
}
```

No hay que olvidar que el `"name": "generator-prueba"` junto con el nombre de nuestra carpeta `generator-prueba` son los que dan instrucciones de correr a Yeoman, estos deben de ser los mismos.
```
...
    "name": "generator-prueba",
...
```

Dentro de Keywords debemos de usar `generator-prueba` para que la gente pueda encontrar nuestro paquete, así:

```
...
"keywords": [
    "yeoman-generator"
],
...
```
### Generador principal y Sub-Generadores

Yeoman, como lo dijimos hace unos momentos, utiliza mucho el nombre y estructura de los archivos para poder funcionar de manera correcta. 

Un `sub-generador` son comandos extra dentro de nuestro generador, como por ejemplo:

```
yo prueba:crear-pagina-web
```

El cual posiblemente nos ayude a crear archivos de una pagina web.

Dentro de nuestro `package.json` debemos de describir donde se encuentran el  `generador principal` y los `sub generadores`. 

Para esto vamos a anadir un objeto json llamado `files` en nuestro archivo `package.json` que tenga un arreglo javascript.
```
...
    "files": [],
...
```

Dentro de este objeto `files` vamos a agregar en todos nuestros generadores una carpeta llamada `app` para referenciar nuestro generador principal, en este caso `yo generator-prueba`.

Primero crearemos la carpeta app:

```
    --generator-prueba/
        --app/
        package.json
```

Y por ultimo agregamos el nombre de nuestra carpeta en el `package.json`

```
...
    "files": [
        'app'
    ],
...
```

Para anadir **Sub Generadores** hacemos exactamente lo que hicimos para el generador principal, solamente que cambiando el nombre de la carpeta. Nuestro **Sub Generador** se llamara `crear-pagina`, así que creamos una carpeta con ese nombre:

```
    --generator-prueba/
        --app/
        --crear-pagina/
        package.json
```

Y agregamos el nombre de nuestra carpeta en el `package.json`


```
...
    "files": [
        'app',
        'crear-pagina'
    ],
...
```

Finalmente nuestro `package.json` queda de la siguiente manera:


```javascript
    {
        "name": "generator-prueba",
        "version": "1.0.0",
        "description": "Tutorial de Uso de Yeoman",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [
            "yeoman-generator"
        ],
        "files": [
            "app",
            "crear-pagina"
        ],
        "dependencies": {
            "yeoman-generator": "^0.20.2"
        },
        "author": "Adrian Eguez",
        "license": "MIT"
    }
```

### Buena practica al crear Sub Generadores

Al empezar a crecer nuestro generador yeoman los **Sub Generadores** van a empezar a ocupar espacio en nuestro directorio, lo que podemos hacer es guardar todos los generadores en una carpeta llamada `generadores` y referenciarlos en nuestro archivo `package.json`.

Nuestro directorio quedaria de la siguiente manera:
```
    --generator-prueba/
        --generators/
            --app/
            --crear-pagina/
    package.json
```
Y nuestros archivo `package.json` así:
```
...
    "files": [
        'generators/app',
        'generators/crear-pagina'
    ],
...
```

## Funcionalidad de los generadores

Por default yeoman va a buscar un archivo llamado `index.js` para correr nuestros generadores.

Vamos a agregar los archivos `index.js` a cada uno de nuestros generadores, quedando nuestro directorio así:

```
    --generator-prueba/
        --generators/
            --app/
                index.js
            --crear-pagina/
                index.js
        package.json
```

Ahora en cada uno de los generadores vamos a implementar la funcionalidad llenando el archivo `index.js` de la carpeta `app` de la siguiente manera:

```javascript
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    //Los metodos corren en orden
    cualquierNombre: function () { 
        console.log('Primero va a correr el metodo cualquierNombre');
    },
    otroNombre: function () {
        console.log('y Luego va a correr el metodo otroNombre');
    }
});
```

y luego en el archivos `index.js`  de la carpeta `crear-pagina` de la siguiente manera:

```javascript
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
```
Hay que notar que los metodos `cualquierNombre` y `otroNombre` de la carpeta `app` y en **cualquier generador** van a correr en el orden escrito.

## Correr un generador

Para nosotros poder correr un generador debemos localizarnos en nuestra carpeta `generator-prueba` y correr el siguiente comando:
```
npm link
```
y vamos a usar la instruccion `yo prueba`:

```
yo prueba
```
La cual nos bota un output en la consola así:
```
Primero va a correr el metodo cualquierNombre
y Luego va a correr el metodo otroNombre
```
Y si probamos nuestro `Sub Generador` llamado `crearpagina` vamos a tener el siguiente output:

```
Primero va a crear la pagina
y Luego va a levantar el servidor web
```
## Conclusion

Creamos desde cero un generador yeoman.
Construimos generadores, sub-generadores y métodos dentro de Yeoman.
Corrimos los generadores que creamos.

## Autor

* [Adrian Eguez](https://github.com/adrianeguez)




















