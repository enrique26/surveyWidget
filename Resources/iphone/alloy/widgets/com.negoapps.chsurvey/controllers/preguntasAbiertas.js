function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.negoapps.chsurvey/" + s : s.substring(0, index) + "/com.negoapps.chsurvey/" + s.substring(index + 1);
    return path;
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
    new (require("alloy/widget"))("com.negoapps.chsurvey");
    this.__widgetId = "com.negoapps.chsurvey";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "preguntasAbiertas";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.preguntasAbiertas = Ti.UI.createScrollView({
        layout: "vertical",
        scrollType: "vertical",
        id: "preguntasAbiertas"
    });
    $.__views.preguntasAbiertas && $.addTopLevelView($.__views.preguntasAbiertas);
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "white",
        height: Titanium.UI.SIZE,
        top: "0",
        id: "__alloyId0"
    });
    $.__views.preguntasAbiertas.add($.__views.__alloyId0);
    $.__views.tPregunta = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        id: "tPregunta",
        top: "0",
        left: "5",
        right: "5",
        color: "black"
    });
    $.__views.__alloyId0.add($.__views.tPregunta);
    $.__views.respuestaAb = Ti.UI.createTextField({
        font: {
            fontSize: "14dp"
        },
        id: "respuestaAb",
        width: "90%",
        top: "50",
        backgroundColor: "white",
        color: "black",
        borderColor: "black",
        hintTextColor: "gray",
        hintText: "Su respuesta"
    });
    $.__views.preguntasAbiertas.add($.__views.respuestaAb);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.tPregunta.text = args.titulo;
    var respuestaElegida = null;
    $.respuestaAb.addEventListener("blur", function() {
        respuestaElegida = $.respuestaAb.value;
        Ti.API.info("elegida " + respuestaElegida);
        Alloy.Globals.respuestasUsuario[args.indicePregunta] = respuestaElegida;
        Ti.API.info("alloy: " + JSON.stringify(Alloy.Globals.respuestasUsuario));
    });
    $.respuestaAb.addEventListener("return", function() {
        respuestaElegida = $.respuestaAb.value;
        Ti.API.info("elegida " + respuestaElegida);
        Alloy.Globals.respuestasUsuario[args.indicePregunta] = respuestaElegida;
        Ti.API.info("alloy: " + JSON.stringify(Alloy.Globals.respuestasUsuario));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;