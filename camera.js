var VideoHandler = /** @class */ (function () {
    function VideoHandler() {
        var _this = this;
        this.localVideo = document.getElementById("local");
        this.recordedVideo = document.getElementById("recorded");
        // ボタン設定
        this.startBtn = document.getElementById("start");
        this.recordBtn = document.getElementById("record");
        this.playBtn = document.getElementById("play");
        this.downloadBtn = document.getElementById("download");
        this.startBtn.addEventListener("click", function () {
            var constraints = {
                video: {
                    width: 1280,
                    height: 720
                }
            };
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(function (stream) { return _this.getLocalMediaStream(stream); })["catch"](_this.handleLocalMediaStreamError);
        });
        this.recordBtn.addEventListener("click", function () {
            if (_this.recordBtn.textContent === "録画開始") {
                _this.startRecording();
            }
            else {
                _this.stopRecording();
                _this.recordBtn.textContent = "録画開始";
                _this.playBtn.disabled = false;
                _this.downloadBtn.disabled = false;
            }
        });
        this.playBtn.addEventListener("click", function () {
            var superBuffer = new Blob(_this.recordedBlobs, { type: "video/webm" });
            _this.recordedVideo.src = "";
            _this.recordedVideo.srcObject = null;
            _this.recordedVideo.src = window.URL.createObjectURL(superBuffer);
            _this.recordedVideo.controls = true;
            _this.recordedVideo.play();
        });
        this.downloadBtn.addEventListener("click", function () {
            var blob = new Blob(_this.recordedBlobs, { type: "video/webm" });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "rec.webm";
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        });
    }
    VideoHandler.prototype.getLocalMediaStream = function (mediaStream) {
        this.recordBtn.disabled = false;
        var localStream = mediaStream;
        this.localVideo.srcObject = mediaStream;
        window.stream = mediaStream;
    };
    VideoHandler.prototype.handleLocalMediaStreamError = function (error) {
        console.log('navigator.getUserMedia Error:', error);
    };
    VideoHandler.prototype.handleDataAvailable = function (event) {
        if (event.data && event.data.size > 0) {
            this.recordedBlobs.push(event.data);
        }
    };
    VideoHandler.prototype.startRecording = function () {
        this.recordedBlobs = [];
        var options = { mimeType: "video/webm;codecs=vp9" };
        try {
            this.mediaRecorder = new MediaRecorder(window.stream, options);
        }
        catch (error) {
            console.log('Exception whil creating MediaRecorder: ${error}');
            return;
        }
        console.log("Created MediaRecorder", this.mediaRecorder);
        this.recordBtn.textContent = "録画停止";
        this.playBtn.disabled = true;
        this.downloadBtn.disabled = true;
        this.mediaRecorder.onstop = function (event) {
            console.log("Recorder stopped: ", event);
        };
        this.mediaRecorder.ondataavailable = this.handleDataAvailable;
        this.mediaRecorder.start(10);
        console.log("MediaRecorder started", this.mediaRecorder);
    };
    VideoHandler.prototype.stopRecording = function () {
        this.mediaRecorder.stop();
        console.log("Recorded media.");
    };
    return VideoHandler;
}());
new VideoHandler();
