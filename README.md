# Node Workshop 2019

Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación ECMAScript (JS ES6), asíncrono, con I/O de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google. Fue creado con el enfoque de ser útil en la creación de programas de red altamente escalables. [Saber más](https://es.wikipedia.org/wiki/Node.js)

Veremos por ejemplo que una tarea común para un servicio web de abrir un archivo en el servidor y devolver el contenido al cliente, es manejado por PHP o ASP de la siguiente manera:
1.	Envía la tarea al sistema de archivos de la computadora.
2.	Espera mientras el sistema de archivos se abre y lee el archivo.
3.	Devuelve el contenido al cliente.
4.	Listo para manejar la siguiente solicitud.

Mientras tanto que en Node.js esta solicitud se maneja de la siguiente manera:
1.	Envía la tarea al sistema de archivos de la computadora.
2.	Listo para manejar la siguiente solicitud.
3.	Cuando el sistema de archivos se abre y lee el archivo, el servidor devuelve el contenido al cliente.

De esta forma Node.js elimina la espera y simplemente continúa con la siguiente solicitud.

Node.js se basa en un modelo concurrente no paralelo, ejecutando una programación asíncrona de subproceso único, sin bloque, que es muy eficiente en memoria. Para entender mejor esto, veamos el siguiente diagrama.

![Node thread diagram](https://raw.githubusercontent.com/arielivandiaz/Node-Workshop-2019/master/images/1.jpg)

Cuando llega un Request al hilo principal de procesamiento del servidor, este es procesado y llama al recurso correspondiente necesario para realizar la operación, que puede ser el sistema de archivos, la base de datos o cualquier otro. Mientras se ejecuta el recurso externo ejecuta la petición el hilo principal de Node.js sigue atendiendo otros request hasta que el callback registra que la solicitud fue cumplida y los recursos solicitados ya están disponibles. De esta forma los datos vuelven al hilo principal y son enviados como respuesta del request inicial.

Para entender esto con un ejemplo, supongamos que un usuario inicia sesión en nuestro servidor en Node.js y para realizar la autenticación llamamos a una base de datos MySQL. Cuando llega el Request de inicio de sesión el código en JavaScript realiza el procesamiento correspondiente y llama a la base de datos MySQL, la cual es un servicio externo a nuestro proceso en Node.js y va a necesitar un tiempo para responder con los datos solicitados. Mientras Node.js espera que la base de datos devuelta la información, este sigue atendiendo otros Request. Cuando la MySQL devuelve lo solicitado, el callback correspondiente de la función que llamo a la base de datos devuelve la información al hilo principal de Node.js y este elabora la respuesta al request del usuario.

## ¿Porque Node.js?
Entre las ventajas de Node.js podemos destacar:
*	Escalabilidad en el procesamiento de datos
*	Confiabilidad para operaciones en tiempo real
*	Constante mejora tecnológica
*	Análisis de errores
*	Conexión persistente con el servidor

Y en cuanto a la performance en desarrollo, grandes marcas como Uber, Paypal, Netflix, Trello, Wallmart, Linkedin, eBay, entre otros [reportan estos resultados](http://inubo.es/noticia/los-10-mejores-ejemplos-de-aplicaciones-node-js-para-empresas):

*	El código se desarrolló  2x más rápido
*	33% menos de código
*	Deploy hasta x5 veces más rápido
*	Más de 2M llamadas RPC por segundo

## Empezemos

El primer paso es instalar Node.js, utilizando las instrucciones de la [página oficial.](https://nodejs.org/es/). Tener en cuenta que si usan Debian, Ubuntu, Redhat, CentOS o Fedora los binarios son proporcionados por NodeSource y se tienen que seguir [estas instrucciones.](https://github.com/nodesource/distributions/blob/master/README.md)

## 01-HelloWorld

Dentro de la primera carpeta tenemos un archivo JavaScript, en el cual las primeras 2 líneas llamamos a las librerías del sistema operativo y del sistema de archivos, las cuales están incluidas en Node.js. Usaremos la función *appendFile* para crear un archivo con la información de nuestro CPU. Vemos que en la línea 7 comentada, el callback de la función appendFile esta descripta como *función(error)* mientras que en la línea anterior el callback está declarado como una función flecha, sintaxis propia de JS6.  Después de ejecutar esta función se escriben logs con información de nuestra PC. Al ejecutar el código con:
```sh
 node 01-HelloWorld
```
Veremos que el log output de *appendFile* se ejecuta después de los console.log, a pesar de que este esta antes. Esto se debe al asincronismo de Node.js. Dado que el sistema de archivos es un recurso externo este tiene un tiempo de respuesta que es manejado por el callback y vemos como el orden en el que se llaman las funciones no es el mismo con el cual se ejecutan.

## 02-Async-vs-Sync

En este segundo ejemplo vamos a ver como ejecutar en orden el código anterior, utilizando *appendFileSync*. En este caso las funciones se ejecutan en el orden que están siendo llamadas. Pero el problema es que no tenemos un callback, por lo tanto, no tenemos un manejador de errores para la creación de nuestro archivo. Y el problema principal es que mientras se ejecuta la función *appendFileSync* nuestra aplicación de node.js queda bloqueada hasta que finalice el recurso externo. Por lo tanto las funciones que tienen su análogo síncrono (“Sync”) las debemos reemplazar por alguna otra alternativa, como las promesas que veremos más adelante, para evitar que nuestro servicio se bloquee.

## 03-Promises
Las promesas son una forma de manejar los eventos de nuestras aplicaciones en JavaScript y por lo tanto en Node.js. Utilizaremos este método para manejar los eventos y callbacks de la ejecución de las funciones que utilizan recursos externos a Node.js.
Este ejemplo utiliza los comandos del sistema operativo para crear un nuevo directorio, escribir un archivo de texto y crear una copia de este. Esto es a modo de ejemplo, si queremos realizar operaciones con archivos y directorios deberíamos usar el FileSystem que provee Node.js. Para continuar haremos uso de la librería child_process la cual instalaremos con el siguiente comando.
Npm install child_process
En la primera línea del código llamamos a la  función *exec* de la librería externa con un *require*, y posteriormente una serie de variables que definen los comandos del cmd. En la línea 10 definiremos una función, y en la línea 11 retornamos una promesa, con 2 estados, *resolve* (si esta se resuelve con éxito) y *reject* (si esta fracasa por causa de un error). Usamos la función *exec* y le pasamos como primer parámetro la instrucción que vamos a realizar, el segundo parámetro es un callback. Si hay un problema o un error en ejecutar la instrucción, haremos un *reject()* de la promesa, si no ejecutaremos *resolve()* para retornar el estado de que la promesa fue resuelta.
Posteriormente ejecutaremos una cadena de promesas en cascada, para realizar todas las operaciones descriptas al comienzo. Para ejecutar este ejemplo usaremos el comando:

```sh
 node 03-Promises.js
```

Al ejecutar por primera vez este ejemplo, se creará la nueva carpeta con los 2 archivos correspondientes, y veremos los logs en la consola. Si lo volvemos a ejecutar veremos que tendremos un error ya que la carpeta ya existe por lo tanto tendremos un *reject*.

## 04-Hello-Express
Express es el framework de node.js más utilizado, y este nos permite crear aplicaciones web de una forma muy sencilla.  Dado que Express es una librería externa al paquete de Node.js, debemos instalarla, para ello utilizaremos el gestor de paquetes de Node.js, llamado npm el cual está incorporado en nuestra instalación de Node.js.
Dentro de la carpeta de esta sección, en la consola del sistema, ejecutaremos el comando:
```sh
 npm init
```
Con este inicializamos un nuevo proyecto de Node.js y nos crea un archivo *package.json* el cual contendrá la descripción de nuestro proyecto y la lista de la dependencias. Posteriormente ejecutamos:
```sh
 npm install Express
```
Con este comando se crea la carpeta */node_modules*, la cual contendrá todos los archivos de las librerías y dependencias de nuestro proyecto actual, 03-Hello-Express.  La carpeta */node_modules* no la debemos incluir en nuestros repositorios git ya que contienen demasiados archivos que no cambian con nuestro proyecto. De un proyecto a otro, podemos utilizar la información del *package.json* para recuperar todas las dependencias utilizada e instalarlas con un simple comando:
```sh
 npm install
```
Bien, ahora dentro de nuestro archivo *03-Hello-Express.js*, crearemos en la línea 2, una nueva aplicación de Express, a la cual en la línea 4 le decimos que cuando se realice un GET en la ruta ‘/’ de nuestro servidor, se enviara el string de la línea 6 como respuesta.
En la línea 10 se inicia nuestra aplicación de Express, utilizando como primer parámetro el puerto de nuestro servidor, y como callback imprimimos la ruta de nuestra aplicación la cual podremos visualizar en el navegador. Para ejecutar este archivo utilizamos el comando
```sh
 node 04-Hello-Express.js
```

## 05-Express-Structure
No encontraremos esta carpeta en el repositorio, porque la generaremos con toda la estructura de nuestro proyecto en Express utilizando el [generador de proyectos de Express](https://expressjs.com/es/starter/generator.html) para ello lo instalamos utilizando el comando:
```sh
npm install express-generator –g
```
Teniendo instalado en nuestra PC el generador de Express con el siguiente comando generaremos todos los archivos necesarios para un proyecto de Express listo para producción.
```sh
express --view=ejs 05-Express-Structure
```
El gestor de plantillas por defecto para Express es jade, pero en nuestro caso usaremos EJS por eso el parámetro *view*. De este comando “04-Express-Structure” seria el nombre nuestro proyecto en Express y el directorio en el que vamos a trabajar.

Para inicializar el proyecto que hemos creado seguimos los comandos:
```sh
cd 05-Express-Structure
npm install
npm start
```

Podremos ver nuestro servicio de Node.js y Express corriendo en http://localhost:3000/. Ahora exploraremos los archivos y directorios creados
*	/bin
    * www: Este archivo contiene la configuración inicial de Node.js para nuestra aplicación. Lo más relevante es la definición de la variable *port* que nos dará el puerto en el que va a correr nuestro servidor.
*	/public: En esta carpeta se guardan los archivos estáticos del frontend, donde por defecto encontramos 3 subcarpetas : *images, javascripts y stylesheets*. Más adelante en el archivo app.js usaremos la función*express.static* para declarar que esta carpeta contiene recursos que pueden ser requeridos por los usuarios por medio de la ruta por ejemplo http://localhost:3000/stylesheets/style.css
*	/routes : En esta carpeta se encontraran los archivos que manejan las rutas de nuestro servidor, generalmente las peticiones POST y GET. Encontraremos 2, uno que define las rutas para el home y otro el directorio */users*.
*	/views: Es donde se guarda las plantillas, los archivos EJS que se renderizaran en HTML y se enviaran a los usuarios como respuesta. 
*	app.js : El archivo principal para iniciar nuestro servidor o aplicación en Node.js. Contiene todos los *require* principales y la configuración de nuestro servicio.
*	
Se recomienda estudiar el código de este ejemplo para entender lo básico del funcionamiento de las futuras aplicaciones de Node.js y Express.

## 06-Express-Startkit
En esta sección veremos una estructura de archivos generada de la misma forma que el ejemplo anterior. En este caso iniciaremos el servidor y al hacerlo estaremos haciendo un ‘GET’ en la ruta ‘/’  de nuestro servidor. Este según lo especificado en el archivo */routes/index.js* nos devuelve una página renderizada en HTML con una variable llamada *message*. Al poner nuestro nombre en el navegador, y darle *submit* al formulario, estamos haciendo un ‘POST’ en la ruta ‘/’ y para este caso en el mismo archivo de rutas tenemos que estamos leyendo el contenido del *body* del formulario de este request, en este caso la variable *req.body.name*.  Con este parámetro renderizamos un nuevo HTML basándonos en el archivo */views/welcome.ejs*.
Vemos entonces en este ejemplo como manejar las distintas rutas, opciones y propiedades de nuestra aplicación al manejar las peticiones HTTP, de las cuales principalmente utilizaremos GET y POST.


## 07-Express-MySQL
En este nuevo ejemplo utilizaremos MySQL como base de datos, para ello deberemos tener instalado MySQL y con esto nos dirigiremos al archivo */config/database.js* y modificaremos los parámetros en función de nuestra configuración.

### Continuará….


[Ariel Ivan Diaz](www.arielivandiaz.com)











