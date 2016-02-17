function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.vistaPrimal = Ti.UI.createView({
        id: "vistaPrimal",
        layout: "vertical",
        top: "20"
    });
    $.__views.index.add($.__views.vistaPrimal);
    $.__views.Descripcion = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "Descripcion",
        left: "5",
        right: "5",
        textAlign: "left"
    });
    $.__views.vistaPrimal.add($.__views.Descripcion);
    $.__views.surv = Ti.UI.createButton({
        id: "surv",
        textAlign: "center",
        top: "10",
        title: "iniciar encuesta",
        height: "200",
        width: "200",
        color: "white",
        backgroundColor: "gray"
    });
    $.__views.vistaPrimal.add($.__views.surv);
    $.__views.tusResp = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "tusResp",
        left: "5",
        right: "5",
        textAlign: "left"
    });
    $.__views.vistaPrimal.add($.__views.tusResp);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    $.Descripcion.text = "Widget para mostrar encuestas,mediante json.\nEl widget genera las vistas para preguntas de las siguientes clases(abierta, opcion multiple,rangos)";
    var jsonV = [ {
        tituloEnc: "encuesta para calcular el nivel de satisfaccion del usuario",
        descripcionEnc: "Descripcion para mostrar al usuario antes de iniciar la encuesta",
        preguntas: [ {
            preguntaT: "Ejemplo de encuesta con opcion multiple.¿cuales son los componentes basicos de esta encuesta?",
            tipoP: "mult",
            opcionesP: [ "opcion a", "opcion b", "opcion c", "opcion d" ],
            limiteSlide: 0,
            etiquetasSlide: []
        }, {
            preguntaT: "Pregunta de tipo abierta contiene un campo de texto Danos tu opnion sobre esta encuesta",
            tipoP: "open",
            opcionesP: [],
            limiteSlide: 0,
            etiquetasSlide: []
        }, {
            preguntaT: "ejemplo de pregunta tipo slide con limite del control a 10, definiendo las 3 etiquetas del slider",
            tipoP: "slide",
            opcionesP: [],
            limiteSlide: 10,
            etiquetasSlide: [ "izquierda", "centro", "derecha" ]
        }, {
            preguntaT: "¿selecciona tu color favorito?",
            tipoP: "mult",
            opcionesP: [ "opcion c", "opcion d", "opcion,e", "opcion f" ],
            limiteSlide: 0,
            etiquetasSlide: []
        }, {
            preguntaT: "Pregunta tipo slide con las 3 etiquetas del slide definidas. y un limite de 100 ",
            tipoP: "slide",
            opcionesP: [],
            limiteSlide: 100,
            etiquetasSlide: [ "izquierda", "centro", "derecha" ]
        }, {
            preguntaT: "Esta es una pregunta con slider a ala cual solo se le definio las etiquetas para la el valor izquierdo y central del slide",
            tipoP: "slide",
            opcionesP: [],
            limiteSlide: 100,
            etiquetasSlide: [ "izquierda", "centro" ]
        }, {
            preguntaT: "Danos tu opnion sobre esta encuesta",
            tipoP: "open",
            opcionesP: [],
            limiteSlide: 0,
            etiquetasSlide: []
        }, {
            preguntaT: "¿selecciona tu color favorito?,¿selecciona tu color favorito?,¿selecciona tu color favorito?,¿selecciona tu color favorito?",
            tipoP: "mult",
            opcionesP: [ "opcion d", "opcion e", "opcion f", "opcion g", "opcion h", "opcion h", "opcion j", "opcion k" ],
            limiteSlide: 0,
            etiquetasSlide: []
        } ]
    } ];
    var widget = null;
    var Epop = null;
    $.surv.addEventListener("click", function() {
        Epop = Ti.UI.createView({
            backgroundColor: "black"
        });
        widget = Alloy.createWidget("com.negoapps.chsurvey", "widget", {});
        widget.abrirEncuesta(jsonV);
        widget.alertaPers("Encuesta", "Termino la encuesta", "Cerrar");
        Epop.add(widget.getView());
        $.index.add(Epop);
    });
    Ti.App.addEventListener("end_enc", function() {
        $.tusResp.text = "Sus respuestas fueron: " + Alloy.Globals.respuestasUsuario;
        if (null != Epop) {
            $.index.remove(Epop);
            widget = null;
            Epop = null;
            Ti.API.info(JSON.stringify(Alloy.Globals.respuestasUsuario));
        }
    });
    Ti.App.addEventListener("cancel_enc", function() {
        if (null != Epop) {
            $.index.remove(Epop);
            widget = null;
            Epop = null;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;