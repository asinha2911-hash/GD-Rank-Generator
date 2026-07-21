export default class ParticleField{


constructor(amount=100){


this.amount=amount;


this.particles=[];


this.generate();


}



generate(){


for(
let i=0;i<this.amount;i++
){


this.particles.push({


x:(Math.random()-0.5)*4,

y:(Math.random()-0.5)*4,

z:(Math.random()-0.5)*4,


size:
Math.random()*0.04+0.01


});


}


}



setAmount(value){


this.amount=value;

this.generate();


}



getParticles(){


return this.particles;


}



}
