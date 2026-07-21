export default class Haze{


constructor(){


this.density=0.5;


this.color="#8b5cf6";


this.distance=1.0;


}



setDensity(value){

this.density=value;

}



setColor(value){

this.color=value;

}



render(){


return {


density:this.density,

color:this.color,

distance:this.distance


};


}


}
