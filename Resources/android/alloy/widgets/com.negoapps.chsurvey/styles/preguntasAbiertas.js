function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.negoapps.chsurvey/" + s : s.substring(0, index) + "/com.negoapps.chsurvey/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0001,
    key: "container",
    style: {}
}, {
    isId: true,
    priority: 100000.0002,
    key: "tPregunta",
    style: {
        font: {
            fontSize: "14dp"
        }
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "respuestaAb",
    style: {
        font: {
            fontSize: "14dp"
        }
    }
} ];