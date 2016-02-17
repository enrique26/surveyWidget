var args = arguments[0] || {};
//args values recibidos-> args.titulo,args.indicePregunta,args.etiquetasSlide
var respuestaElegida=null;

$.tPregunta.text=args.titulo;
var etiquetas=args.etiquetasSlide || ['','',''];
var slider = Titanium.UI.createSlider({
    top: 10,
    min: 0,
    minRange:0,
    // leftTrackImage:'/imagenes/colorYellow_.jpg',
    maxRange:args.limiteSlide,
    max: args.limiteSlide,
    value: 0
});

$.sliderCont.add(slider);

slider.addEventListener('change',function(e){
	$.contadorV.text=parseInt(e.value);
});
slider.addEventListener('stop',function(e){
	respuestaElegida=parseInt(e.value);
	Alloy.Globals.respuestasUsuario[args.indicePregunta]=respuestaElegida;
	Ti.API.info('alloy: '+JSON.stringify(Alloy.Globals.respuestasUsuario));
});

if(etiquetas[0]!=''){
	var labelIzq=Ti.UI.createLabel({
		width:'30%',
		textAlign:'left',
		text:etiquetas[0],
		color:'black',
		font:{fontSize:'16dp'},
		left:0
	});
	$.etiquetasV.add(labelIzq);
}
if(etiquetas[1]!=''){
	var labelCen=Ti.UI.createLabel({
		width:'30%',
		textAlign:'center',
		text:etiquetas[1],
		color:'black',
		font:{fontSize:'16dp'},
	});
	$.etiquetasV.add(labelCen);
}
if(etiquetas[2]!=''){
	var labelDer=Ti.UI.createLabel({
		width:'30%',
		textAlign:'right',
		text:etiquetas[2],
		color:'black',
		right:0,
		font:{fontSize:'16dp'},
	});
	$.etiquetasV.add(labelDer);
}
