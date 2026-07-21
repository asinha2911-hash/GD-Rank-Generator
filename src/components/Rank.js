import Particles from "./Particles.js";
import Haze from "./Haze.js";


export default class Rank{


constructor(){


this.name=
"Bloodstone";


this.crystal=
null;


this.frame=
null;


this.effects={


particles:
new Particles(),


haze:
new Haze()


};



}



setName(name){

this.name=name;

}



setCrystal(crystal){

this.crystal=crystal;

}



setFrame(frame){

this.frame=frame;

}



render(){

return {


name:
this.name,


crystal:
this.crystal,


frame:
this.frame,


effects:
this.effects


};


}


}
