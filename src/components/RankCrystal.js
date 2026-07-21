import Layer from "../engine/Layer.js";


export default class RankCrystal extends Layer{


constructor(options={}){

super();

this.color=options.color ?? "#9b0000";

this.size=options.size ?? 120;

}


render(ctx){


ctx.save();


ctx.shadowBlur=40;
ctx.shadowColor=this.color;

ctx.fillStyle=this.color;


ctx.beginPath();

ctx.moveTo(400,150);
ctx.lineTo(520,260);
ctx.lineTo(400,370);
ctx.lineTo(280,260);

ctx.closePath();

ctx.fill();


ctx.restore();


}


}
