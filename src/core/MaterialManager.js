import CrystalMaterial from "../materials/CrystalMaterial.js";
import GlowMaterial from "../materials/GlowMaterial.js";
import PostProcess from "../rendering/PostProcess.js";


export default class MaterialManager{


constructor(){


this.crystal =
new CrystalMaterial();



this.glow =
new GlowMaterial();



this.post =
new PostProcess();



}



update(settings){


this.crystal.setColor(

settings.crystal.color

);



this.crystal.setGlow(

settings.crystal.glow

);



this.glow.setStrength(

settings.effects.bloom

);



this.post.update(

settings

);



}



getMaterials(){


return {


crystal:this.crystal,

glow:this.glow,

post:this.post


};


}



}
