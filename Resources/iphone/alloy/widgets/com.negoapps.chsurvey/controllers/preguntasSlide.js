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
    this.__controllerPath = "preguntasSlide";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.preguntasSlide = Ti.UI.createScrollView({
        layout: "vertical",
        scrollType: "vertical",
        id: "preguntasSlide"
    });
    $.__views.preguntasSlide && $.addTopLevelView($.__views.preguntasSlide);
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "white",
        height: Titanium.UI.SIZE,
        top: "0",
        id: "__alloyId2"
    });
    $.__views.preguntasSlide.add($.__views.__alloyId2);
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
    $.__views.__alloyId2.add($.__views.tPregunta);
    $.__views.vistaSlide = Ti.UI.createView({
        id: "vistaSlide",
        layout: "vertical",
        bottom: "0",
        height: Titanium.UI.SIZE
    });
    $.__views.preguntasSlide.add($.__views.vistaSlide);
    $.__views.contadorV = Ti.UI.createLabel({
        id: "contadorV",
        left: "5",
        right: "5",
        top: "50",
        textAlign: "center",
        color: "black",
        backgroundColor: "white",
        text: "0"
    });
    $.__views.vistaSlide.add($.__views.contadorV);
    $.__views.sliderCont = Ti.UI.createView({
        id: "sliderCont",
        height: Titanium.UI.SIZE,
        width: "90%"
    });
    $.__views.vistaSlide.add($.__views.sliderCont);
    $.__views.etiquetasV = Ti.UI.createView({
        id: "etiquetasV",
        height: Titanium.UI.SIZE,
        width: "90%"
    });
    $.__views.vistaSlide.add($.__views.etiquetasV);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var respuestaElegida = null;
    $.tPregunta.text = args.titulo;
    var etiquetas = args.etiquetasSlide || [ "", "", "" ];
    var slider = Titanium.UI.createSlider({
        top: 10,
        min: 0,
        minRange: 0,
        maxRange: args.limiteSlide,
        max: args.limiteSlide,
        value: 0
    });
    $.sliderCont.add(slider);
    slider.addEventListener("change", function(e) {
        $.contadorV.text = parseInt(e.value);
    });
    slider.addEventListener("stop", function(e) {
        respuestaElegida = parseInt(e.value);
        Alloy.Globals.respuestasUsuario[args.indicePregunta] = respuestaElegida;
        Ti.API.info("alloy: " + JSON.stringify(Alloy.Globals.respuestasUsuario));
    });
    if ("" != etiquetas[0]) {
        var labelIzq = Ti.UI.createLabel({
            width: "30%",
            textAlign: "left",
            text: etiquetas[0],
            color: "black",
            font: {
                fontSize: "16dp"
            },
            left: 0
        });
        $.etiquetasV.add(labelIzq);
    }
    if ("" != etiquetas[1]) {
        var labelCen = Ti.UI.createLabel({
            width: "30%",
            textAlign: "center",
            text: etiquetas[1],
            color: "black",
            font: {
                fontSize: "16dp"
            }
        });
        $.etiquetasV.add(labelCen);
    }
    if ("" != etiquetas[2]) {
        var labelDer = Ti.UI.createLabel({
            width: "30%",
            textAlign: "right",
            text: etiquetas[2],
            color: "black",
            right: 0,
            font: {
                fontSize: "16dp"
            }
        });
        $.etiquetasV.add(labelDer);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;