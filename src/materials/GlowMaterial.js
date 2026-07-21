import Material from "./Material.js";


export default class GlowMaterial extends Material{


constructor(){


super();



this.uniforms={


strength:
1.0,


radius:
0.5,


color:
"#ff3333"


};


}



setStrength(value){

this.uniforms.strength=value;

}



}
