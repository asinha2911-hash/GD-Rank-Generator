export default class Material{


constructor(){


this.uniforms={};


}



set(name,value){


this.uniforms[name]=value;


}



get(name){


return this.uniforms[name];


}


}
