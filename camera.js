var VideoHandler = /** @class */ (function () {
    function VideoHandler() {
        this.playVideo();
    }
    VideoHandler.prototype.startVideoRecording = function () { };
    VideoHandler.prototype.stopVideoRecording = function () { };
    VideoHandler.prototype.downloadVideo = function () { };
    VideoHandler.prototype.playVideo = function () {
        var video = document.getElementById("video");
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
    return VideoHandler;
}());
new VideoHandler();
