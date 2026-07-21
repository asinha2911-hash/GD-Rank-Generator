export default class Shader {


constructor(gl,vertex,fragment){


this.gl=gl;


const vs=this.compile(
gl.VERTEX_SHADER,
vertex
);


const fs=this.compile(
gl.FRAGMENT_SHADER,
fragment
);


this.program =
gl.createProgram();


gl.attachShader(
this.program,
vs
);


gl.attachShader(
this.program,
fs
);


gl.linkProgram(
this.program
);


}



compile(type,source){


const shader =
this.gl.createShader(type);


this.gl.shaderSource(
shader,
source
);


this.gl.compileShader(
shader
);


return shader;


}



use(){

this.gl.useProgram(
this.program
);

}


}
