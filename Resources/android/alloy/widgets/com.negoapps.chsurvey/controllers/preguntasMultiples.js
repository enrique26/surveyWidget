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
    function tablaCont() {
        Ti.API.info("opciones" + JSON.stringify(respOp));
        var dataT = [];
        for (var _i = 0; _i < respOp.length; _i++) {
            var row = Ti.UI.createTableViewRow({
                title: respOp[_i],
                backgroundColor: "white",
                color: "black",
                height: 45,
                leftImage: WPATH("/imagenes/radio-off.png")
            });
            dataT.push(row);
        }
        $.respuestas.data = dataT;
    }
    new (require("alloy/widget"))("com.negoapps.chsurvey");
    this.__widgetId = "com.negoapps.chsurvey";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "preguntasMultiples";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.preguntasMultiples = Ti.UI.createView({
        id: "preguntasMultiples"
    });
    $.__views.preguntasMultiples && $.addTopLevelView($.__views.preguntasMultiples);
    $.__views.__alloyId1 = Ti.UI.createScrollView({
        backgroundColor: "white",
        height: "25%",
        top: "0",
        scrollType: "vertical",
        id: "__alloyId1"
    });
    $.__views.preguntasMultiples.add($.__views.__alloyId1);
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
    $.__views.__alloyId1.add($.__views.tPregunta);
    $.__views.respuestas = Ti.UI.createTableView({
        id: "respuestas",
        top: "25%",
        height: "75%",
        left: "0",
        width: "90%",
        separatorColor: "transparent"
    });
    $.__views.preguntasMultiples.add($.__views.respuestas);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.tPregunta.text = args.titulo;
    var respuestaElegida = null;
    var respOp = args.opciones;
    tablaCont();
    $.respuestas.addEventListener("click", function(e) {
        var data = {
            title: respOp[e.index],
            backgroundColor: "blue",
            color: "white",
            height: 45,
            leftImage: WPATH("/imagenes/radio-on.png")
        };
        tablaCont();
        $.respuestas.updateRow(e.index, data);
        respuestaElegida = e.row.title;
        Ti.API.info("respuesta elegida " + respuestaElegida);
        Alloy.Globals.respuestasUsuario[args.indicePregunta] = respuestaElegida;
        Ti.API.info("alloy: " + JSON.stringify(Alloy.Globals.respuestasUsuario));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;