import Layer from "../engine/Layer.js";


export default class Particles extends Layer{


render(ctx){


ctx.fillStyle="white";


for(let i=0;i<40;i++){


ctx.beginPath();

ctx.arc(

Math.random()*800,

Math.random()*600,

2,

0,

Math.PI*2

);


ctx.fill();


}


}


}
