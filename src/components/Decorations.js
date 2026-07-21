import Layer from "../engine/Layer.js";


export default class Decorations extends Layer{


render(ctx){


ctx.strokeStyle="#ff5555";

ctx.lineWidth=3;


ctx.beginPath();

ctx.arc(

400,

260,

170,

0,

Math.PI*2

);


ctx.stroke();


}


}
