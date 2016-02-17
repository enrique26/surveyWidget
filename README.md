#Widget para encuestas Alloy android-ios
=======================================
 sdk minimo 5.0.0

Este widget permite añadir una vista para mostar encuestas dentro de la aplicacion.
Permite cargar encuestas mediate formato json.
Permitiendo visualizar 3 tipos de preguntas :
* Abiertas, 
* opcion multiple,
* rangos (unsando un control slider).

Tipos de preguntas:
* caracter abierto - mediante textfield ('open')
* caracter multiple- varias opciones ('mult')
* caracter rango- uso de slider ('slider')

Estructura del json para la encuesta:
(ver ejemplo (app/controllers/widget.js)).
```
json=[{"tituloEnc":"Mi encuesta", //titulo de la encuesta
  "descripcionEnc":"descripcion corta para mi encuesta",//descricpion dela encuesta
     "preguntas":[{//contenido o preguntas de la encuesta
          "preguntaT":"¿cuales son los componentes basicos de esta encuesta?",//tutulo de la pregunta
          "tipoP":"mult",//tipo de pregunta
          "opcionesP":['opcion a','opcion b','opcion c','opcion d'],//opciones para pregunta de opcion multiple
          "limiteSlide":0,//limite para preguntas de rango
          "etiquetasSlide":[] // etiquetas informativas para el slider de pregunta de rango
	 }]
}];
```
____________________________________________________________________________
##USO del WIDGET

Copiar la carpeta Widgets, en la carpeta "app" del proyecto o copiar el contenido 
en la carpeta widgets del proyecto si esta ya esta creada.

Modificar el archivo config.json del proyecto y añadir el widget al apartado "dependencies"
```
"dependencies": {
		"com.negoapps.chsurvey": "1.0"
	}
```
______________________________________________________________________________	
##EJEMPLO DE USO

Probar widget, el uso de este widget esta pensado para mostar la encuesta como si se tratase
de un popup , enmbedido en un view de la ventana actual
(ver ejemplo en app/controllers/widget.js).

```
Definir variable que contendra el controlador del widget 
var widget=null;
//definir variable para crar la vista que mostrara el widget
var Epop=null;

//mostrar la encuesta despues de un evento determinado

$.button.addEventListener('click',function()
{	//crea la vista para el widget
	Epop=Ti.UI.createView({
		backgroundColor:'black',
	});
	
	//Llamar al controlador principal del widget
	//para cambiar el color a la cabecera, boton y footer de progreso de la encuesta
	// del contenedor de la encuesta se pueden pasar los siguietnes parametros al crear el widget
	//"colorHead"-cambia el color de la cabecera que contiene el titulo de la encuesta
	//"colorBackProgress"- cambia el color de la parte inferior de la ventana que contiene la encuesta
	//"btBackColor"- cambia el color del boton de avance de la encuesta
	//ejemplo de uso
	widget = Alloy.createWidget('com.negoapps.chsurvey', 'widget’,{
		“colorHead":"#225522",
		"colorBackProgress":"#225522",
		"btBackColor":"#225522"}); 
	
	widget = Alloy.createWidget('com.negoapps.chsurvey', 'widget',{});
	
	//cargar el json de la encuesta, llamando la funcion "abrirEncuesta" del widget
	widget.abrirEncuesta(jsonV);
	
	//personalizar mensaje de alerta mostrado al terminar la encuesta
	//la función "alertaPers" espera 3 cadenas como parametros 'titulo','mensaje','texto boton ok'
	//si se invoca esta funcion sin parametros se definen valores por defecto para el mensaje
	//si esta función no se define , la alerta mostrara los valores que tiene por defecto
	widget.alertaPers('Encuesta #','Termino la encuesta','Cerrar');
	
	//añadir el widget a la vista que lo contendra y mostrarlo
	Epop.add(widget.getView());
	
	//añadir la vista creada con el widget agregado
	$.index.add(Epop);});
}
```
_____________________________________________________________________________
##CONSULTAR RESULTADOS DE LA ENCUESTA
el widget almacena los resultado mediante una variable global 
para consultar los resultados de las respuestas se debe hacer referencia a:
```
Alloy.Globals.respuestasUsuario;
```
Ejemplo:
```
Ti.API.info(Alloy.Globals.respuestasUsuario);
```
esta variable almacena un array con las respuestas del usuario según la longitud de la encuesta

______________________________________________________________________________

##REMOVER LA VISTA Y EL WIDGET DE LA ENCUESTA

Para remover el widget de la encuesta y obtener las repuestas
el widget usa el el evento 'end_enc' para indicar que la encuesta se termino

```
Ti.App.addEventListener('end_enc',function(){
//si nuestra vista contenedora es diferente de nulo 
//se eliminan los elementos del widget y se remueve la vista que lo contenía
	if(Epop!=null){
		//remueve la vista que contiene el widget
		$.index.remove(Epop);
		//limpier las variables del widget para la siguiente encuesta
		widget=null;
		Epop=null;
		Ti.API.info(JSON.stringify(Alloy.Globals.respuestasUsuario));
	}
});
```
________________________________________________________________________________
##CANCELAR LA ENCUESTA

Evento de cancelación de la encuesta se da al presionar el boton “cancel” del widget.
//mediante este evento puede usarse para remover el widget al ser cancelada la encuesta
```
Ti.App.addEventListener('cancel_enc',function(){
	if(Epop!=null){
		//remueve la vista que contiene el widget
		$.index.remove(Epop);
		//limpiar las variables del widget para la siguiente encuesta
		widget=null;
		Epop=null;
	}
});
```