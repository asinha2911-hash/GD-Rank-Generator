import Bloom from "../effects/Bloom.js";
import Haze from "../effects/Haze.js";
import Aura from "../effects/Aura.js";


export default class PostProcess{


constructor(){


this.bloom =
new Bloom();



this.haze =
new Haze();



this.aura =
new Aura();



}



update(settings){



this.bloom.setStrength(

settings.effects.bloom

);



this.haze.setDensity(

settings.effects.haze

);



}



render(){


return {


bloom:
this.bloom,


haze:
this.haze,


aura:
this.aura


};


}


}
