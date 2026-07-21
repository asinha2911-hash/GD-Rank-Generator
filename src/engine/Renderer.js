export default class Renderer{


constructor(canvas,composer){

this.canvas=canvas;

this.ctx=canvas.getContext();

this.composer=composer;

}



start(){


const loop=()=>{


this.ctx.clearRect(

0,
0,

this.canvas.canvas.width,
this.canvas.canvas.height

);


this.composer.render(this.ctx);


requestAnimationFrame(loop);


};


loop();


}


}
