export default class Particles{


constructor(count=150){


this.count=count;


this.positions=[];


for(
let i=0;i<count;i++
){


this.positions.push({

x:
Math.random()*2-1,


y:
Math.random()*2-1,


size:
Math.random()*3+1


});


}


}



getParticles(){

return this.positions;

}


}
