export default class Canvas {

constructor(){

this.canvas=document.createElement("canvas");
this.ctx=this.canvas.getContext("2d");

document.body.appendChild(this.canvas);

this.resize();

window.addEventListener(
"resize",
()=>this.resize()
);

}


resize(){

this.canvas.width=window.innerWidth;
this.canvas.height=window.innerHeight;

}


getContext(){

return this.ctx;

}

}
