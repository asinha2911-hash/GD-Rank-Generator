import Layer from "../engine/Layer.js";


export default class StarField extends Layer{


render(ctx){


ctx.fillStyle="#111";


ctx.fillRect(

0,

0,

window.innerWidth,

window.innerHeight

);


}


}
