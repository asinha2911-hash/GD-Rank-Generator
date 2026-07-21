import RankSettings from "../settings/RankSettings.js";
import RankScene from "../scene/RankScene.js";
import MaterialManager from "./MaterialManager.js";


export default class RankController{


constructor(){


this.settings =
new RankSettings();



this.scene =
new RankScene();



this.materials =
new MaterialManager();



}



update(){


this.materials.update(

this.settings

);


}



changeGlow(value){


this.settings.update(

"crystal.glow",

value

);



this.update();


}



changeColor(value){


this.settings.update(

"crystal.color",

value

);



this.update();


}



changeParticles(value){


this.settings.update(

"effects.particles",

value

);



this.update();


}



getState(){


return {


settings:this.settings,

scene:this.scene,

materials:this.materials


};


}


}
