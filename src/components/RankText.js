import Layer from "../engine/Layer.js";


export default class RankText extends Layer{


constructor(text){

super();

this.text=text;

}


render(ctx){


ctx.save();


ctx.fillStyle="white";

ctx.font="bold 42px Arial";

ctx.textAlign="center";


ctx.fillText(

this.text,

400,

470

);


ctx.restore();


}


}
