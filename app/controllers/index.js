
$.index.open();

//Al usarse como widget, puede ser necesario añadir la siguiente variable en el archivo alloy.js del proyecto para almacenar las respuestas
//Alloy.Globals.respuestasUsuario=[];

//NOTA:
//añade al archivo config.json de la aplicacion la referencia del widget en el apartado "dependencies" 
//"dependencies": {
//        "com.negoapps.chsurvey": "1.0"
//    }

//json ejemplo
/*json estructura:
 * [{"tituloEnc":"titulo encuesta",
 * "descripcionEnc":"descripcion encuesta",
 * "preguntas":[{
 * 			"preguntaT":"titulo pregunta",
 * 			"tipoP":"(mul|open|slide)",
 * 			"opcionesP":["string","string"],//opciones para preguntas de opcion multiple
 * 			"limiteSlide":int, //limite para preguntas tipo slide el slide corre de 0 a el limite establecido
 * 			"etiquetasSlide":["etiqueta izq string","etiqueta cen string","etiqueta der string"] //etiquetas para las preguntas tipo slide, array de strings 
 * 		},{
 * 			"preguntaT":"titulo pregunta",
 * 			"tipoP":"(mul|open|slide)",
 * 			"opcionesP":["string","string"],//opciones para preguntas de opcion multiple
 * 			"limiteSlide":int, //limite para preguntas tipo slide el slide corre de 0 a el limite establecido
 * 			"etiquetasSlide":["etiqueta izq string","etiqueta cen string","etiqueta der string"] //etiquetas para las preguntas tipo slide, array de strings 
 * 		}]
 * }]
*/

/*funciones controlador principal para el widget survey
 * abrirEncuesta(json)-recibe el json de la encuesta 
 * alertaPers('titulo','mensaje','texto boton ok')- personaliza el mensaje de alerta al terminar la encuesta, si un valor es nulo coloca el texto por defecto
 */

$.Descripcion.text='Widget para mostrar encuestas,mediante json.\nEl widget genera las vistas para preguntas de las siguientes clases(abierta, opcion multiple,rangos)';

var jsonV=[{
	"tituloEnc":"encuesta para calcular el nivel de satisfaccion del usuario",
	"descripcionEnc":"Descripcion para mostrar al usuario antes de iniciar la encuesta",
	"preguntas":[{
		"preguntaT":"Ejemplo de encuesta con opcion multiple.¿cuales son los componentes basicos de esta encuesta?",
		"tipoP":"mult",
		"opcionesP":["opcion a","opcion b","opcion c","opcion d"],
		"limiteSlide":0,
		"etiquetasSlide":[]
	},{
		"preguntaT":"Pregunta de tipo abierta contiene un campo de texto Danos tu opnion sobre esta encuesta",
		"tipoP":"open",
		"opcionesP":[],
		"limiteSlide":0,
		"etiquetasSlide":[]
	},{
		"preguntaT":"ejemplo de pregunta tipo slide con limite del control a 10, definiendo las 3 etiquetas del slider",
		"tipoP":"slide",
		"opcionesP":[],
		"limiteSlide":10,
		"etiquetasSlide":["izquierda","centro","derecha"]
	},{
		"preguntaT":"¿selecciona tu color favorito?",
		"tipoP":"mult",
		"opcionesP":["opcion c","opcion d","opcion,e","opcion f"],
		"limiteSlide":0,
		"etiquetasSlide":[]
	},{
		"preguntaT":"Pregunta tipo slide con las 3 etiquetas del slide definidas. y un limite de 100 ",
		"tipoP":"slide",
		"opcionesP":[],
		"limiteSlide":100,
		"etiquetasSlide":["izquierda","centro","derecha"]
	},{
		"preguntaT":"Esta es una pregunta con slider a ala cual solo se le definio las etiquetas para la el valor izquierdo y central del slide",
		"tipoP":"slide",
		"opcionesP":[],
		"limiteSlide":100,
		"etiquetasSlide":["izquierda","centro"]
	},{
		"preguntaT":"Danos tu opnion sobre esta encuesta",
		"tipoP":"open",
		"opcionesP":[],
		"limiteSlide":0,
		"etiquetasSlide":[]
	},{
		"preguntaT":"¿selecciona tu color favorito?,¿selecciona tu color favorito?,¿selecciona tu color favorito?,¿selecciona tu color favorito?",
		"tipoP":"mult",
		"opcionesP":["opcion d","opcion e","opcion f","opcion g","opcion h","opcion h","opcion j","opcion k"],
		"limiteSlide":0,
		"etiquetasSlide":[]
	}]
}];

//EJEMPLO DE USO

//probar widget
//definir variable que contendra el controlador del widget 
var widget=null;
//definir variable para crar la vista que mostrara el widget
var Epop=null;

$.surv.addEventListener('click',function(){
	//crea la vista para el widget
	Epop=Ti.UI.createView({
		backgroundColor:'black',
	});
	//llamar al controlador princiapl del widget
	//para cambiar el color a la cbaecera, boton y footer de progreso del contenedor de la encuesta se pueden pasar los parametros
	//"colorHead","colorBackProgress", "btBackColor" al llamar el widget 
	widget = Alloy.createWidget('com.negoapps.chsurvey', 'widget',{"colorHead":"#225522","colorBackProgress":"#225522","btBackColor":"#225522"});
	
	//cargar la encuesta, llamando la funcion abrir encuesta del widget
	widget.abrirEncuesta(jsonV);
	
	//personalizar mensaje de alerta al terminar la encuesta
	//la funcion espera 3 cadenas como parametros 'titulo','mensaje','texto boton ok'
	//si se invoca esta funcion sin parametros se definen valores por defecto para el mensaje
	widget.alertaPers('Encuesta','Termino la encuesta','Cerrar');
	
	//añadir el widget a la vista que lo contendra
	Epop.add(widget.getView());
	//añadir la vista creada con el widget agregado
	$.index.add(Epop);
	
});

//remover el widget de la encuesta y obtener las repuestas
//mediante el evento 'end_enc'
Ti.App.addEventListener('end_enc',function(){
	$.tusResp.text='Sus respuestas fueron: '+Alloy.Globals.respuestasUsuario;
	if(Epop!=null){
		//remueve la vista que contiene el widget
		$.index.remove(Epop);
		//limpier las variables del widget para la siguiente encuesta
		widget=null;
		Epop=null;
		Ti.API.info(JSON.stringify(Alloy.Globals.respuestasUsuario));
	}
});

//evento de cancelacion de la encuesta.remover el widget al cancelar
Ti.App.addEventListener('cancel_enc',function(){
	if(Epop!=null){
		//remueve la vista que contiene el widget
		$.index.remove(Epop);
		//limpier las variables del widget para la siguiente encuesta
		widget=null;
		Epop=null;
	}
});

