class VideoHandler{
    private localVideo = <HTMLMediaElement>document.getElementById("local");
    private recordedVideo = <HTMLMediaElement>document.getElementById("recorded");
    
    // ボタン設定
    private startBtn = <HTMLInputElement>document.getElementById("start"); 
    private recordBtn = <HTMLInputElement>document.getElementById("record"); 
    private playBtn = <HTMLInputElement>document.getElementById("play"); 
    private downloadBtn = <HTMLInputElement>document.getElementById("download"); 

    private mediaRecorder:MediaRecorder;
    private recordedBlobs:Array<ArrayBuffer> = [];

	constructor(){

        this.startBtn.addEventListener("click", () => {
            const constraints = {
                video: {
                    width: 1280,
                    height: 720
                }
            };

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => this.getLocalMediaStream(stream))
                .catch(this.handleLocalMediaStreamError);
        });

        this.recordBtn.addEventListener("click", () => {
            if (this.recordBtn.textContent === "録画開始") {
              this.recordedBlobs = [];
              this.startRecording(this.recordedBlobs);
            } else {
              this.stopRecording(this.recordedBlobs);
              this.recordBtn.textContent = "録画開始";
              this.playBtn.disabled = false;
              this.downloadBtn.disabled = false;
            }
        });

        this.playBtn.addEventListener("click", () => {
            const superBuffer = new Blob(this.recordedBlobs, { type: "video/webm" });
            this.recordedVideo.src = "";
            this.recordedVideo.srcObject = null;
            this.recordedVideo.src = window.URL.createObjectURL(superBuffer);
            this.recordedVideo.controls = true;
            this.recordedVideo.play();                
          });

        this.downloadBtn.addEventListener("click", () => {
            const blob = new Blob(this.recordedBlobs, { type: "video/webm" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "rec.webm";
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        });
	}

    private getLocalMediaStream(mediaStream): void{
        this.recordBtn.disabled = false;
        this.localVideo.srcObject = mediaStream;
        (window as any).stream = mediaStream;
    }

    private handleLocalMediaStreamError(error): void{
        console.log('navigator.getUserMedia Error:', error)
    }

    private handleDataAvailable(event, recordedBlobs:Array<ArrayBuffer>): void{
        if (event.data && event.data.size > 0){
            recordedBlobs.push(event.data);
        }
    }

    private startRecording(recordedBlobs:Array<ArrayBuffer>): void{
        const options:MediaRecorderOptions = { mimeType: "video/webm;codecs=vp9"};

        try {
            this.mediaRecorder = new MediaRecorder((window as any).stream, options);
        } catch (error){
            console.log('Exception while creating MediaRecorder: ${error}');
            return;
        }

        console.log("Created MediaRecorder", this.mediaRecorder);
        this.recordBtn.textContent = "録画停止";
        this.playBtn.disabled = true;
        this.downloadBtn.disabled = true;

        this.mediaRecorder.onstop = event => {
            console.log("Recorder stopped: ", event);
        };

        this.mediaRecorder.ondataavailable = (e) => this.handleDataAvailable(e, recordedBlobs);
        this.mediaRecorder.start(10);
        console.log("MediaRecorder started", this.mediaRecorder);
    }

    private stopRecording(recordedBlobs): void{
        this.mediaRecorder.stop();
        console.log("Recorded media.");
    }
} 

new VideoHandler();