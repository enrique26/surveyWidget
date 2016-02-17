var args = arguments[0] || {};

$.headSurvey.backgroundColor=args.colorHead || '#44a922';
$.progresoSurvey.backgroundColor=args.colorBackProgress || '#44a922';
$.avanza.backgroundColor=args.btBackColor || '#44a922';


// var verPreg=require('lib/preguntasCont');
// 
//  surveypop.js
//  chsurvey
//  generar vista para encuesta para aplicacion movil 
//  Created by Enrique Gachuz on 2016-02-11.
//  Copyright 2016 Enrique Gachuz. All rights reserved.
// 
/* json encuesta-estructura:
 *
 * -titulo o nombre de la encuesta
 * -descripcion para el usuario/naturaleza de la encuesta
 * -array:preguntas de la encuesta
 * ->array:
 * 		-preguntaT:preguntas de la encuesta estructura
 * 		-tipoP: de la pregunta abierta o cerrada
 * 		-opcionesP: de respuesta en caso de ser preunga cerrada
 * 		-limteSlide: en caso de ser una pregunta de tipo slider
 * 		-etiquetasSlide:etiquetas que indican los limites del slide [izquierda,centro,derecha]
*/

// var jsonEncuestas=[{
	// "tituloEnc":"Mi encuesta",
	// "descripcionEnc":"descripcion corta para mi encuesta",
	// "preguntas":[{
		// "preguntaT":"¿cuales son los componentes basicos de esta encuesta?",
		// "tipoP":"mult",
		// "opcionesP":['opcion a','opcion b','opcion c','opcion d'],
		// "limiteSlide":0,
		// "etiquetasSlide":[]
	// },{
		// "preguntaT":"Danos tu opnion sobre esta encuesta",
		// "tipoP":"open",
		// "opcionesP":[],
		// "limiteSlide":0,
		// "etiquetasSlide":[]
	// },{
		// "preguntaT":"indica tu nivel de satifcaccion con esta encuesta",
		// "tipoP":"slide",
		// "opcionesP":[],
		// "limiteSlide":10,
		// "etiquetasSlide":['izquierda','centro','derecha']
	// },{
		// "preguntaT":"¿selecciona tu color favorito?",
		// "tipoP":"mult",
		// "opcionesP":['opcion c','opcion d','opcion,e','opcion f'],
		// "limiteSlide":0,
		// "etiquetasSlide":[]
	// },{
		// "preguntaT":"indica tu nivel de satifcaccion con esta encuesta",
		// "tipoP":"slide",
		// "opcionesP":[],
		// "limiteSlide":100,
		// "etiquetasSlide":['izquierda','centro','derecha']
	// },{
		// "preguntaT":"indica tu nivel de satifcaccion con esta encuesta",
		// "tipoP":"slide",
		// "opcionesP":[],
		// "limiteSlide":100,
		// "etiquetasSlide":['izquierda','centro']
	// },{
		// "preguntaT":"Danos tu opnion sobre esta encuesta",
		// "tipoP":"open",
		// "opcionesP":[],
		// "limiteSlide":0,
		// "etiquetasSlide":[]
	// },{
		// "preguntaT":"¿selecciona tu color favorito?,¿selecciona tu color favorito?,¿selecciona tu color favorito?,,¿selecciona tu color favorito?",
		// "tipoP":"mult",
		// "opcionesP":['opcion c','opcion d','opcion,e','opcion f','otra d','tal ves otra d','opcion f','otra d','tal ves otra d'],
		// "limiteSlide":0,
		// "etiquetasSlide":[]
	// }]
// }];

//al usarse como widget, puede ser necesario añadir la siguiente linea en el archivo alloy.js del proyecto para almacenar las respuestas
//Alloy.Globals.respuestasUsuario=[];
//anñade al archivo config.json de la aplicacion la referencia del widget en dependencies 
//"dependencies": {
//        "com.negoapps.chsurvey": "1.0"
//    }

//variable global que almacena las respuestas
Alloy.Globals.respuestasUsuario=[];
//variable que contendra el json de la encuesta
var jsonV=[];

function detallesEncuesta(jsonEncuestas){
	//mostrar el titulo de la encuesta obtenida del json
	$.tituloEncuesta.text=jsonEncuestas[0].tituloEnc;
	
	var longitudEncuesta=jsonEncuestas[0].preguntas;
	//determinar la longitud de las respuestas de la variable global
	//para reemplazar y actualizar las repuestas segun su indice
	function logitudRespuestas(){
		datalong=[];
		for(var _i=0;_i<longitudEncuesta.length;_i++){
			datalong.push("");
		}
		Alloy.Globals.respuestasUsuario=datalong;
	};
	logitudRespuestas();
}


//@indexEncuesta controla la posicion de la pregunta en el array para navegar entre las preguntas
var indexEncuesta=0;
var _elem=null;
//almacenar el contenido de la encuesta
var _obj=[];

var alertaFix=Ti.UI.createAlertDialog({
	title:'titulo alerta',
	message:'Ha concluido la encuesta.gracias por su participacion',
	ok:'Entendido'
});

//personalizar mensaje de alerta
exports.alertaPers=function(titulo,mensaje,boton){
	alertaFix.title=titulo || 'Titulo Alerta';
	alertaFix.message=mensaje || 'Ha conluido la encuesta';
	alertaFix.ok=boton || 'Entendido';
	
};

function cargarEncuesta(jsonEncuestas){
	
	//remover vista de la pregunta actual y regresar @_elem a null para cargar la siguiente vista/elemento
	if(_elem!=null){
		$.cuerpoSurvey.remove(_elem);
		_elem=null;
	}
	
	//modificar el porcentage de avance para android solo se mostrara el numero de porcentaje
	//en ios la etiqqueta modifica el backgroundcGradient para mostrar el avance como barra de progreso
		var _percent=((100/_obj.length)*indexEncuesta);
		$.porcentaje.text=parseInt(_percent)+'%';
		var colorPer=parseInt(_percent)+'%';
		if(Ti.Platform.osname=='iphone'||Ti.Platform.osname=='ipad'){
			$.porcentaje.backgroundGradient={
				type : 'linear',
				            startPoint : {
				                x : '0%',
				                y : '0%'
				            },
				            endPoint : {
				                x :colorPer,
				                y : '0%'
				            }, 
				            colors : [{color : '#44B5E3',offset : 1.0}]
				};
		}
	//si el valor de la bandera @indexEncuesta  es menor que la longitu de @_obj carga las vistas de las preguntas		 
	if(indexEncuesta<_obj.length){
		//mostrar estilo de pregunta segun el tipo definido en el json
		if(_obj[indexEncuesta].tipoP=='mult'){
			_elem=Alloy.createWidget('com.negoapps.chsurvey','preguntasMultiples',{"titulo":_obj[indexEncuesta].preguntaT,"opciones":_obj[indexEncuesta].opcionesP,"indicePregunta":indexEncuesta}).getView();
			$.cuerpoSurvey.add(_elem);
			indexEncuesta+=1;
			Ti.API.info('indexencuesta'+indexEncuesta);
		}else if(_obj[indexEncuesta].tipoP=='open'){
			_elem=Alloy.createWidget('com.negoapps.chsurvey','preguntasAbiertas',{"titulo":_obj[indexEncuesta].preguntaT,"indicePregunta":indexEncuesta}).getView();
			$.cuerpoSurvey.add(_elem);
			indexEncuesta+=1;
			Ti.API.info('indexencuesta'+indexEncuesta);
		}else if(_obj[indexEncuesta].tipoP=='slide'){
			_elem=Alloy.createWidget('com.negoapps.chsurvey','preguntasSlide',{"titulo":_obj[indexEncuesta].preguntaT,"limiteSlide":_obj[indexEncuesta].limiteSlide,"etiquetasSlide":_obj[indexEncuesta].etiquetasSlide,"indicePregunta":indexEncuesta}).getView();
			$.cuerpoSurvey.add(_elem);
			indexEncuesta+=1;
			Ti.API.info('indexencuesta'+indexEncuesta);
		}else{
			indexEncuesta+=1;
		}
	}else{
		//se muestra una alerta al terminar la encuesta
		alertaFix.show();
		//al temrinat la encuesta de dispara un firevent para controlar el cierre de la encuesta en la aplicaion principal
		Ti.App.fireEvent('end_enc');
		
	}

};
//evento que permite cerar wl widget mediante el evento cancel_enc
$.cancelaE.addEventListener('click',function(){
	Ti.App.fireEvent('cancel_enc');
});

//inicializar las variables de la encuesta
exports.abrirEncuesta=function(json){
	jsonV=json;
	_obj=jsonV[0].preguntas;
	detallesEncuesta(jsonV);
	cargarEncuesta();
};

//avanzar las preguntas de la encuesta
$.avanza.addEventListener('click',function(){
	cargarEncuesta();
});