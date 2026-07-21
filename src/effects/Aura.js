export default class Aura{


constructor(){


this.radius=1.5;

this.intensity=0.8;

this.color="#9b111e";


}



setIntensity(value){

this.intensity=value;

}



setRadius(value){

this.radius=value;

}



getData(){


return {


radius:this.radius,

intensity:this.intensity,

color:this.color


};


}


}
