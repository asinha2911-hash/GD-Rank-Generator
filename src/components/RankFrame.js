import Layer from "../engine/Layer.js";


export default class RankFrame extends Layer{


render(ctx){

ctx.save();


ctx.strokeStyle="#c0c0c0";

ctx.lineWidth=8;


ctx.strokeRect(
220,
80,
360,
360
);


ctx.restore();

}


}
