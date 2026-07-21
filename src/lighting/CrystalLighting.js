import Light from "./Light.js";


export default class CrystalLighting{


constructor(){


this.mainLight =
new Light();



this.internalGlow=0.8;


}



setGlow(value){


this.internalGlow=value;


}



calculate(vertex){


return {


light:

this.mainLight.intensity,


glow:

this.internalGlow


};


}



}
