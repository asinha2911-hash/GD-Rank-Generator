import Material from "./Material.js";


export default class CrystalMaterial extends Material{


constructor(){


super();



this.uniforms={


color:
"#9b111e",


glow:
0.8,


roughness:
0.15,


metallic:
0.4,


reflection:
0.85,


facetStrength:
1.0,


internalLight:
0.7


};


}



setColor(value){

this.uniforms.color=value;

}



setGlow(value){

this.uniforms.glow=value;

}



setReflection(value){

this.uniforms.reflection=value;

}



}
