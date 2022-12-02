class VideoHandler{
	constructor(){
        this.playVideo();
	}

    startVideoRecording(){}

    stopVideoRecording(){}

    downloadVideo(){}

    playVideo(){
        const video = <HTMLMediaElement>document.getElementById("video");
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        }).then(stream => {
            video.srcObject = stream;
            video.play()
        }).catch(e => {
          console.log(e)
        }) 
    }
} 

new VideoHandler();