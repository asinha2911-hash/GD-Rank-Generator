export default class Bloom{


constructor(){


this.strength=0.8;

this.radius=0.6;

this.threshold=0.5;


}



setStrength(value){

this.strength=value;

}



setRadius(value){

this.radius=value;

}



apply(color){


return {


color:color,

strength:this.strength,

radius:this.radius,

threshold:this.threshold


};


}


}
