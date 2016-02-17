function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.negoapps.chsurvey/" + s : s.substring(0, index) + "/com.negoapps.chsurvey/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function detallesEncuesta(jsonEncuestas) {
        function logitudRespuestas() {
            datalong = [];
            for (var _i = 0; _i < longitudEncuesta.length; _i++) datalong.push("");
            Alloy.Globals.respuestasUsuario = datalong;
        }
        $.tituloEncuesta.text = jsonEncuestas[0].tituloEnc;
        var longitudEncuesta = jsonEncuestas[0].preguntas;
        logitudRespuestas();
    }
    function cargarEncuesta() {
        if (null != _elem) {
            $.cuerpoSurvey.remove(_elem);
            _elem = null;
        }
        var _percent = 100 / _obj.length * indexEncuesta;
        $.porcentaje.text = parseInt(_percent) + "%";
        parseInt(_percent) + "%";
        if (indexEncuesta < _obj.length) if ("mult" == _obj[indexEncuesta].tipoP) {
            _elem = Alloy.createWidget("com.negoapps.chsurvey", "preguntasMultiples", {
                titulo: _obj[indexEncuesta].preguntaT,
                opciones: _obj[indexEncuesta].opcionesP,
                indicePregunta: indexEncuesta
            }).getView();
            $.cuerpoSurvey.add(_elem);
            indexEncuesta += 1;
            Ti.API.info("indexencuesta" + indexEncuesta);
        } else if ("open" == _obj[indexEncuesta].tipoP) {
            _elem = Alloy.createWidget("com.negoapps.chsurvey", "preguntasAbiertas", {
                titulo: _obj[indexEncuesta].preguntaT,
                indicePregunta: indexEncuesta
            }).getView();
            $.cuerpoSurvey.add(_elem);
            indexEncuesta += 1;
            Ti.API.info("indexencuesta" + indexEncuesta);
        } else if ("slide" == _obj[indexEncuesta].tipoP) {
            _elem = Alloy.createWidget("com.negoapps.chsurvey", "preguntasSlide", {
                titulo: _obj[indexEncuesta].preguntaT,
                limiteSlide: _obj[indexEncuesta].limiteSlide,
                etiquetasSlide: _obj[indexEncuesta].etiquetasSlide,
                indicePregunta: indexEncuesta
            }).getView();
            $.cuerpoSurvey.add(_elem);
            indexEncuesta += 1;
            Ti.API.info("indexencuesta" + indexEncuesta);
        } else indexEncuesta += 1; else {
            alertaFix.show();
            Ti.App.fireEvent("end_enc");
        }
    }
    new (require("alloy/widget"))("com.negoapps.chsurvey");
    this.__widgetId = "com.negoapps.chsurvey";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.contentSurvey = Ti.UI.createView({
        id: "contentSurvey",
        layout: "vertical",
        width: "90%",
        height: "90%",
        backgroundColor: "white"
    });
    $.__views.contentSurvey && $.addTopLevelView($.__views.contentSurvey);
    $.__views.headSurvey = Ti.UI.createView({
        id: "headSurvey",
        backgroundColor: "#44a922",
        height: "15%"
    });
    $.__views.contentSurvey.add($.__views.headSurvey);
    $.__views.tituloEncuesta = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        text: "titulo encuesta",
        id: "tituloEncuesta",
        color: "white",
        left: "0",
        width: "79%",
        textAlign: "left"
    });
    $.__views.headSurvey.add($.__views.tituloEncuesta);
    $.__views.cancelaE = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        id: "cancelaE",
        color: "white",
        right: "5",
        width: "20%",
        text: "Cancel",
        textAlign: "center"
    });
    $.__views.headSurvey.add($.__views.cancelaE);
    $.__views.cuerpoSurvey = Ti.UI.createView({
        id: "cuerpoSurvey",
        height: "65%"
    });
    $.__views.contentSurvey.add($.__views.cuerpoSurvey);
    $.__views.avanza = Ti.UI.createButton({
        title: "Siguiente",
        id: "avanza",
        top: "1%",
        height: "8%",
        color: "white",
        backgroundColor: "#44a922",
        borderRadius: "6",
        width: "200"
    });
    $.__views.contentSurvey.add($.__views.avanza);
    $.__views.progresoSurvey = Ti.UI.createView({
        id: "progresoSurvey",
        top: "1%",
        height: "10%",
        backgroundColor: "#44a922"
    });
    $.__views.contentSurvey.add($.__views.progresoSurvey);
    $.__views.porcentaje = Ti.UI.createLabel({
        text: "0%",
        id: "porcentaje",
        color: "black",
        left: "0",
        right: "0",
        textAlign: "center"
    });
    $.__views.progresoSurvey.add($.__views.porcentaje);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.headSurvey.backgroundColor = args.colorHead || "#44a922";
    $.progresoSurvey.backgroundColor = args.colorBackProgress || "#44a922";
    $.avanza.backgroundColor = args.btBackColor || "#44a922";
    Alloy.Globals.respuestasUsuario = [];
    var jsonV = [];
    var indexEncuesta = 0;
    var _elem = null;
    var _obj = [];
    var alertaFix = Ti.UI.createAlertDialog({
        title: "titulo alerta",
        message: "Ha concluido la encuesta.gracias por su participacion",
        ok: "Entendido"
    });
    exports.alertaPers = function(titulo, mensaje, boton) {
        alertaFix.title = titulo || "Titulo Alerta";
        alertaFix.message = mensaje || "Ha conluido la encuesta";
        alertaFix.ok = boton || "Entendido";
    };
    $.cancelaE.addEventListener("click", function() {
        Ti.App.fireEvent("cancel_enc");
    });
    exports.abrirEncuesta = function(json) {
        jsonV = json;
        _obj = jsonV[0].preguntas;
        detallesEncuesta(jsonV);
        cargarEncuesta();
    };
    $.avanza.addEventListener("click", function() {
        cargarEncuesta();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;