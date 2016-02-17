function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.negoapps.chsurvey/" + s : s.substring(0, index) + "/com.negoapps.chsurvey/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0009,
    key: "container",
    style: {}
}, {
    isId: true,
    priority: 100000.001,
    key: "tituloEncuesta",
    style: {
        font: {
            fontSize: "14dp"
        }
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "cancelaE",
    style: {
        font: {
            fontSize: "14dp"
        }
    }
} ];