export default class UniformManager{


constructor(gl,program){


this.gl=gl;

this.program=program;


this.uniforms={};


}



create(name){


this.uniforms[name]=
this.gl.getUniformLocation(

this.program,

name

);


}



setFloat(name,value){


if(this.uniforms[name]){


this.gl.uniform1f(

this.uniforms[name],

value

);


}


}



setColor(name,color){


const rgb =
this.hexToRGB(color);



this.gl.uniform3f(

this.uniforms[name],

rgb.r,

rgb.g,

rgb.b

);



}



hexToRGB(hex){


return {


r:
parseInt(
hex.substr(1,2),
16
)/255,


g:
parseInt(
hex.substr(3,2),
16
)/255,


b:
parseInt(
hex.substr(5,2),
16
)/255


};


}



}
