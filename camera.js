var Camera = /** @class */ (function () {
    function Camera(name) {
        this.name = name;
    }
    Camera.prototype.sayHello = function () {
        return "Camera is ".concat(this.name, ".");
    };
    return Camera;
}());
var p = new Camera('OK');
var s = p.sayHello();
document.getElementById('div1').innerHTML = s;
