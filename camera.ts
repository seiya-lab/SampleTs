class Camera {
	name: string;
	
	constructor(name: string){
		this.name = name;
	}
	
	sayHello(){
		return `Camera is ${this.name}.`;
	}
} 

let p = new Camera('OK');
let s = p.sayHello();

document.getElementById('div1').innerHTML = s;