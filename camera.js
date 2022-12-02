var CameraHandler = /** @class */ (function () {
    function CameraHandler(name) {
        this.name = name;
    }
    CameraHandler.prototype.playVideo = function () {
        var video = document.getElementById(this.name);
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(function (stream) {
            video.srcObject = stream;
            video.play();
        })["catch"](function (e) {
            console.log(e);
        });
    };
    return CameraHandler;
}());
// const video = document.getElementById("video")
// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: false,
// }).then(stream => {
//     video.srcObject = stream;
//     video.play()
// }).catch(e => {
//   console.log(e)
// })
var p = new CameraHandler('video');
p.playVideo();
// let s = p.sayHello();
// document.getElementById('div1').innerHTML = s;
