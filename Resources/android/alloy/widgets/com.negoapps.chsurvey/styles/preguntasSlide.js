function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.negoapps.chsurvey/" + s : s.substring(0, index) + "/com.negoapps.chsurvey/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0007,
    key: "container",
    style: {}
}, {
    isId: true,
    priority: 100000.0008,
    key: "tPregunta",
    style: {
        font: {
            fontSize: "14dp"
        }
    }
} ];