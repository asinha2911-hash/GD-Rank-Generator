export default class Glow{


constructor(power=20){

this.power=power;

}


apply(ctx){

ctx.shadowBlur=this.power;

}


}
