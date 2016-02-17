var args = arguments[0] || {};
//args values recibidos-> args.titulo,args.indicePregunta

$.tPregunta.text=args.titulo;
var respuestaElegida=null;

$.respuestaAb.addEventListener('blur',function(){
	respuestaElegida=$.respuestaAb.value;
	
	Ti.API.info('elegida '+respuestaElegida);
	Alloy.Globals.respuestasUsuario[args.indicePregunta]=respuestaElegida;
	Ti.API.info('alloy: '+JSON.stringify(Alloy.Globals.respuestasUsuario));
});

$.respuestaAb.addEventListener('return',function(){
	respuestaElegida=$.respuestaAb.value;
	
	Ti.API.info('elegida '+respuestaElegida);
	Alloy.Globals.respuestasUsuario[args.indicePregunta]=respuestaElegida;
	Ti.API.info('alloy: '+JSON.stringify(Alloy.Globals.respuestasUsuario));
});


