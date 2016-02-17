var args = arguments[0] || {};
//args values recibidos-> args.titulo,args.indicePregunta,args.opciones
	
	$.tPregunta.text=args.titulo;
	var respuestaElegida=null;
	
	//cargar las repuestas de la pregunta
	var respOp=args.opciones;
	
	function tablaCont(){
		Ti.API.info('opciones'+JSON.stringify(respOp));
		var dataT=[];
		
		for(var _i=0;_i<respOp.length;_i++){
			var row=Ti.UI.createTableViewRow({
				backgroundColor:'white',
				height:45,
				leftImage:WPATH('/imagenes/radio-off.png')
			});
			
			var labelRow=Ti.UI.createLabel({
				text:respOp[_i],
				color:'black',
				font:{fontSize:'16dp'},
				left:80,
				right:0,
				touchEnabled:false
			});
			row.add(labelRow);
			dataT.push(row);
		}
		
		$.respuestas.data=dataT;
	}
	tablaCont();
	
	$.respuestas.addEventListener('click',function(e){
		
		Ti.API.info('erowlabel:'+JSON.stringify(e.row.children));
		var labelRow=Ti.UI.createLabel({
				text:respOp[e.index],
				color:'white',
				font:{fontSize:'16dp'},
				left:80,
				right:0,
				touchEnabled:false
			});
		//actualizar los datos del row seleccionado
		var data = Ti.UI.createTableViewRow({
			backgroundColor:'blue',
			height:45,
			leftImage:WPATH('/imagenes/radio-on.png')
			
		});
		data.add(labelRow);
		// cargar nuevamente la tabla original y depuest reemplazar el estilo del row seleccionado
		tablaCont();
		$.respuestas.updateRow(e.index,data);
		Ti.API.info('EROWCHILDREN:'+JSON.stringify(e.row.children));
		respuestaElegida=e.row.title;
		Ti.API.info('respuesta elegida '+respuestaElegida);
		Alloy.Globals.respuestasUsuario[args.indicePregunta]=respuestaElegida;
		Ti.API.info('alloy: '+JSON.stringify(Alloy.Globals.respuestasUsuario));
	});