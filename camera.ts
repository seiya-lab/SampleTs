class CameraHandler{
	name: string;
	
	constructor(name: string){
		this.name = name;
	}

    playVideo(){
        const video = <HTMLMediaElement>document.getElementById(this.name);
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

let p = new CameraHandler('video')
p.playVideo();
// let s = p.sayHello();

// document.getElementById('div1').innerHTML = s;